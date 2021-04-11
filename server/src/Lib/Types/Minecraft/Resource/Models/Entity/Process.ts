import { TextDocument } from "vscode-languageserver-textdocument";
import { Location, Range } from "vscode-languageserver-types";
import { JsonDocument } from "../../../../../Code/Json/Json Document";
import { Database } from "../../../../../Database/Database";
import { DataReference } from "../../../../../Database/Types/Reference";
import { ModelEntity } from "./ModelEntity";

export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Data = JDoc.CastTo<ModelEntity>();

  if (Data) {
    if (Data.format_version === "1.8.0") {
      let keys = Object.keys(Data);

      for (let k in keys) {
        if (k !== "format_version") {
          let range = JDoc.RangeOf(k) ?? Range.create(0, 0, 0, 0);

          Database.Data.Resourcepack.Models.Set(new DataReference(k, Location.create(JDoc.doc.uri, range)));
        }
      }
    } else {
      for (let Geo of Data["minecraft:geometry"]) {
        let id = Geo.description.identifier;
        let range = JDoc.RangeOf(id) ?? Range.create(0, 0, 0, 0);

        Database.Data.Resourcepack.Models.Set(new DataReference(id, Location.create(JDoc.doc.uri, range)));
      }
    }
  }
}
