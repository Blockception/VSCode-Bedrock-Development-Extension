import { Location } from "vscode-languageserver";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";
import { EmptyTypes } from "../../../General/Empty";
import { Entity } from "./Entity";

export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<Entity>();

  if (Entity.is(Format)) {
    let Identifier = Format["minecraft:client_entity"].description.identifier;
    let Location: Location = {
      range: EmptyTypes.EmptyRange(),
      uri: doc.uri,
    };

    Database.Data.Resourcepack.Entities.Set(new DataReference(Identifier, Location));
  }
}
