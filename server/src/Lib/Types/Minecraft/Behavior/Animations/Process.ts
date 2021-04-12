import { Location, Position } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { Molang } from "../../../../include";
import { EmptyTypes } from "../../../General/Empty";
import { Animation, SingleAnimation } from "./Animation";

/**
 * Processes the text document as a behaviour entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<Animation>();

  if (!Animation.is(Format)) return;

  let Names = Object.getOwnPropertyNames(Format.animations);
  for (let Index = 0; Index < Names.length; Index++) {
    const Name = Names[Index];
    let Range = JDoc.GetRangeOfObject(Name);
    let Location: Location = {
      uri: doc.uri,
      range: Range ?? EmptyTypes.EmptyRange(),
    };

    Database.Data.Behaviourpack.Animations.Set(new DataReference(Name, Location));
    let Animation = Format.animations[Name];

    /*if (Animation) {
      ExploreAnimation(Animation, JDoc);
    }*/
  }
}

function ExploreAnimation(Animation: SingleAnimation, doc: JsonDocument) {
  let timelines = Animation.timeline;
  if (timelines) {
    let Names = Object.getOwnPropertyNames(timelines);

    for (let I = 0; I < Names.length; I++) {
      let Name = Names[I];

      let timeline = timelines[Name];
      if (timeline && timeline.length) {
        for (let I = 0; I < timeline.length; I++) {
          let data = timeline[I];
          let start = doc.GetStartOfObject(data);

          if (!start) {
            start = Position.create(0, 0);
          }

          Molang.Process(data, start, doc.doc);
        }
      }
    }
  }
}
