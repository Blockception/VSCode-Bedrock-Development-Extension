import { Types } from "bc-minecraft-bedrock-types";
import { DocumentLocation } from "bc-minecraft-bedrock-types/lib/src/Types";
import { Location } from "vscode-languageserver-types";
import { GetDocument } from "../Types/Document/Document";

export namespace References {
  /**
   *
   * @param item
   * @param receiver
   * @returns
   */
  export function ConvertLocation(items: ((Types.Locatable & Types.Identifiable) | Location | undefined)[]): Location[] {
    let receiver: Location[] = [];

    for (let I = 0; I < items.length; I++) {
      const item = items[I];
      if (item === undefined) continue;

      if (Location.is(item)) {
        receiver.push(item);
        continue;
      }

      const doc = GetDocument(item.location.uri);

      if (!doc) continue;

      const range = DocumentLocation.ToRange(item.location.position, doc, item.id.length);
      receiver.push(Location.create(doc.uri, range));
    }

    return receiver;
  }
}
