import { BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";
import { WorldPack } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/World/WorldPack";
import { ExecuteCommandParams, TextDocumentEdit, TextEdit } from "vscode-languageserver";
import { HandleError } from '../../Code/Error';
import { Console } from '../../Manager/Console';
import { Manager } from "../../Manager/Manager";
import { GetDocument } from "../../Types/Document/Document";
import { TextDocument } from "../../Types/Document/TextDocument";

export function AddAllItems(params: ExecuteCommandParams): any {
  const args = params.arguments;

  if (args) {
    const uri = args[0];

    if (uri !== "") {
      const doc = GetDocument(uri);

      if (doc) {
        const pack = doc.getPack();
        if (!pack) return;

        const builder = new TextEditBuilder(doc);
        if (BehaviorPack.BehaviorPack.is(pack)) {
          generate_bp(pack, builder);
        } else if (ResourcePack.ResourcePack.is(pack)) {
          generate_rp(pack, builder);
        } else if (WorldPack.is(pack)) {
          generate_wp(pack, builder);
        }

        const edit = TextEdit.insert(doc.positionAt(builder.textdoc.length), builder.out);

        if (builder.out.length > 0)
          try {
            const p = Manager.Connection.workspace.applyEdit({
              edit: { documentChanges: [TextDocumentEdit.create({ uri: doc.uri, version: doc.version }, [edit])] },
            });

            p.then((check)=>{
              if (!check.applied) Console.Error("Document edit failed!");
              if (check.failureReason) Console.Error(check.failureReason);
            });

            p.catch((error) => {
              HandleError(error, doc);
            });

          } catch (e) { 
            HandleError(e, doc); 
          }
      }
    }
  }

  return undefined;
}

export function generate_bp(pack: BehaviorPack.BehaviorPack, builder: ITextEditBuilder) {
  pack.entities.forEach((entity) => {
    const id = Safe(entity.id);

    builder.Add("entity." + entity.id + ".name", id, "Entity: " + entity.id);
    builder.Add("item.spawn_egg.entity." + entity.id + ".name", "Spawn " + id, "Spawn egg for entity: " + entity.id);
  });

  pack.blocks.forEach((data) => builder.Add("tile." + data.id + ".name", Safe(data.id), "Block: " + data.id));
  pack.items.forEach((item) => builder.Add("item." + item.id + ".name", Safe(item.id), "Item: " + item.id));
}

export function generate_rp(pack: ResourcePack.ResourcePack, builder: ITextEditBuilder) {
  pack.entities.forEach((entity) => {
    const id = Safe(entity.id);

    builder.Add("entity." + entity.id + ".name", id, "Entity: " + entity.id);
    builder.Add("item.spawn_egg.entity." + entity.id + ".name", "Spawn " + id, "Spawn egg for entity: " + entity.id);
  });

  pack.blocks.forEach((data) => builder.Add("tile." + data.id + ".name", Safe(data.id), "Block: " + data.id));
}

export function generate_wp(pack: WorldPack, builder: ITextEditBuilder) {}

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
