import { BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";
import { WorldPack } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/World/WorldPack";
import { TextDocumentEdit, TextEdit } from "vscode-languageserver";
import { Context } from "../../context/context";
import { TextDocument } from "../../documents/text-document";
import { CommandContext } from "../context";

export async function addAllItems(context: Context<CommandContext>): Promise<void> {
  const { logger, arguments: args } = context;
  if (args === undefined) {
    throw new Error("no arguments");
  }

  const uri = args[0];
  if (uri === "" || uri === undefined) {
    throw new Error("no uri given, should be at 0");
  }

  const document = context.documents.get(uri);
  if (document === undefined) {
    throw new Error("document not found: " + uri);
  }
  const pack = document.pack();
  if (!pack) {
    return logger.info("ignoring command, because document is not associated with a pack");
  }

  const builder = new TextEditBuilder(document);

  if (BehaviorPack.BehaviorPack.is(pack)) {
    generate_bp(pack, builder);
  } else if (ResourcePack.ResourcePack.is(pack)) {
    generate_rp(pack, builder);
  } else if (WorldPack.is(pack)) {
    generate_wp();
  }

  const edit = TextEdit.insert(document.positionAt(builder.textdoc.length), builder.out);

  if (builder.out.length > 0) {
    try {
      const check = await context.connection.workspace.applyEdit({
        edit: {
          documentChanges: [TextDocumentEdit.create({ uri: document.uri, version: document.version }, [edit])],
        },
      });

      if (!check.applied) logger.error("document edit failed!");
      if (check.failureReason) logger.error(check.failureReason);
    } catch (e) {
      logger.recordError(e, document);
    }
  }
}

export function generate_bp(pack: BehaviorPack.BehaviorPack, builder: ITextEditBuilder) {
  pack.entities.forEach((entity) => {
    const id = Safe(entity.id);

    builder.Add(`entity.${entity.id}.name`, id, "Entity: " + entity.id);
    builder.Add(`item.spawn_egg.entity.${entity.id}.name`, "Spawn " + id, "Spawn egg for entity: " + entity.id);
  });

  pack.blocks.forEach((data) => builder.Add(`tile.${data.id}.name`, Safe(data.id), "Block: " + data.id));
  pack.items.forEach((item) => builder.Add(`item.${item.id}.name`, Safe(item.id), "Item: " + item.id));
}

export function generate_rp(pack: ResourcePack.ResourcePack, builder: ITextEditBuilder) {
  pack.entities.forEach((entity) => {
    const id = Safe(entity.id);

    builder.Add(`entity.${entity.id}.name`, id, "Entity: " + entity.id);
    builder.Add(`item.spawn_egg.entity.${entity.id}.name`, "Spawn " + id, "Spawn egg for entity: " + entity.id);
  });
}

export function generate_wp() {}

function Safe(id: string): string {
  const index = id.indexOf(":");
  if (index > -1) {
    return id.substring(index + 1, id.length).trim();
  }

  return id;
}

export interface ITextEditBuilder {
  Add(Key: string, Value: string, Comment: string | undefined): void;
}

export class TextEditBuilder implements ITextEditBuilder {
  public out: string;
  readonly textdoc: string;

  constructor(doc: TextDocument | undefined) {
    this.out = "";
    this.textdoc = doc?.getText() ?? "";
  }

  Add(Key: string, Value: string, Comment: string | undefined = undefined): void {
    let Temp = Key + "=";
    if (this.textdoc.includes(Temp)) return;

    Temp += Value;

    if (Comment) {
      Temp += "\t## " + Comment;
    }

    this.out += Temp + "\n";
  }
}
