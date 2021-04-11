import { Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { EmptyTypes } from "../../../General/Empty";
import { Particle } from "./Particle";

export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<Particle>();

  if (Particle.is(Format)) {
    let Identifier = Format.particle_effect.description.identifier;
    let Location: Location = {
      range: EmptyTypes.EmptyRange(),
      uri: doc.uri,
    };

    Database.Data.Resourcepack.Particles.Set(new DataReference(Identifier, Location));
  }
}
