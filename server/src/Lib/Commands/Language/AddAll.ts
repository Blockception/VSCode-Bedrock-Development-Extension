import { UniformUrl } from "../../Code/Url";

/**TODO
export function AddAllItems(params: ExecuteCommandParams): any {
  let args = params.arguments;

  if (args) {
    const uri = UniformUrl(args[0]);

    if (uri !== "") {
      const doc = GetDocument(uri);

      if (doc) {
        let builder = new TextEditBuilder(doc);

        Database.ProjectData.BehaviorPacks.Entities.forEach((entity) => {
          const id = Safe(entity.id);

          builder.Add("entity." + entity.id + ".name", id, "Entity: " + entity.id);
          builder.Add("item.spawn_egg.entity." + entity.id + ".name", "Spawn " + id, "Spawn egg for entity: " + entity.id);
        });

        Database.ProjectData.BehaviorPacks.Items.forEach((data) => {
          const id = Safe(data.id);

          builder.Add("item." + data.id + ".name", id, "Item: " + data.id);
        });

        Database.ProjectData.BehaviorPacks.Blocks.forEach((data) => {
          const id = Safe(data.id);

          builder.Add("tile." + data.id + ".name", id, "Block: " + data.id);
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
**/
