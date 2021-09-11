import { ExecuteCommandParams, TextDocumentEdit, TextEdit } from "vscode-languageserver";

import { GetDocument } from "../../Types/Document/Document";
import { Database } from "../../Database/Database";
import { Manager } from "../../Manager/include";
import { TextDocument } from "../../Types/Document/TextDocument";
import { UniformUrl } from "../../Code/Url";

export function AddAllItems(params: ExecuteCommandParams): any {
  let args = params.arguments;

  if (args) {
    const uri = UniformUrl(args[0]);

    if (uri !== "") {
      const doc = GetDocument(uri);

      if (doc) {
        let builder = new TextEditBuilder(doc);

        Database.ProjectData.BehaviorPacks.Entities.ForEach((entity) => {
          const id = Safe(entity.Identifier);

          builder.Add("entity." + entity.Identifier + ".name", id, "Entity: " + entity.Identifier);
          builder.Add("item.spawn_egg.entity." + entity.Identifier + ".name", "Spawn " + id, "Spawn egg for entity: " + entity.Identifier);
        });

        Database.ProjectData.Behaviorpack.Items.ForEach((data) => {
          const id = Safe(data.Identifier);

          builder.Add("item." + data.Identifier + ".name", id, "Item: " + data.Identifier);
        });

        Database.ProjectData.Behaviorpack.Blocks.ForEach((data) => {
          const id = Safe(data.Identifier);

          builder.Add("tile." + data.Identifier + ".name", id, "Block: " + data.Identifier);
        });

        const edit = TextEdit.insert(doc.positionAt(builder.textdoc.length), builder.out);

        Manager.Connection.workspace.applyEdit({
          edit: { documentChanges: [TextDocumentEdit.create({ uri: doc.uri, version: doc.version }, [edit])] },
        });
      }
    }
  }

  return undefined;
}

function Safe(id: string): string {
  const index = id.indexOf(":");
  if (index > -1) {
    return id.substring(index + 1, id.length).trim();
  }

  return id;
}

class TextEditBuilder {
  public out: string;
  readonly textdoc: string;

  constructor(doc: TextDocument) {
    this.out = "";
    this.textdoc = doc.getText();
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
