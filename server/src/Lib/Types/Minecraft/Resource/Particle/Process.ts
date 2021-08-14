import { Location } from "vscode-languageserver";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";
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

    Database.ProjectData.Resourcepack.Particles.Set(new DataReference(Identifier, Location));
  }
}
