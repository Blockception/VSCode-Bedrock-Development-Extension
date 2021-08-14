import { Location, Range } from "vscode-languageserver-types";
import { JsonDocument } from "../../../../Document/Json Document";
import { Database } from "../../../../../Database/Database";
import { DataReference } from "../../../../../Database/Types/Reference";
import { ModelEntity } from "./ModelEntity";
import { TextDocument } from "../../../../Document/TextDocument";

export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Data = JDoc.CastTo<ModelEntity>();

  if (Data) {
    if (Data.format_version === "1.8.0" || Data.format_version === "1.10.0") {
      const keys = Object.keys(Data);

      for (let k of keys) {
        if (k !== "format_version") {
          Add(k, JDoc);
        }
      }
    } else if (Data["minecraft:geometry"]) {
      const goes = Data["minecraft:geometry"];

      for (var I = 0; I < goes.length; I++) {
        let Info = goes[I];

        Add(Info.description.identifier, JDoc);
      }
    }
  }
}

function Add(identifier: string, JDoc: JsonDocument): void {
  const range = JDoc.RangeOf(identifier) ?? Range.create(0, 0, 0, 0);

  Database.ProjectData.Resourcepack.Models.Set(new DataReference(identifier, Location.create(JDoc.doc.uri, range)));
}
