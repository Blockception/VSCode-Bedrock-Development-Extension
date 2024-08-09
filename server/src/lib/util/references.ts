import { Types } from "bc-minecraft-bedrock-types";
import { DocumentLocation } from "bc-minecraft-bedrock-types/lib/src/types";
import { Location } from "vscode-languageserver-types";
import { IDocumentManager } from "../lsp/documents/manager";

export namespace References {
  /**
   *
   * @param item
   * @param receiver
   * @returns
   */
  export function convertLocation(
    items: ((Types.Locatable & Types.Identifiable) | Location | undefined)[],
    documents: IDocumentManager
  ): Location[] {
    let receiver: Location[] = [];

    for (let I = 0; I < items.length; I++) {
      const item = items[I];
      if (item === undefined) continue;

      if (Location.is(item)) {
        receiver.push(item);
        continue;
      }

      const document = documents.get(item.location.uri);
      if (!document) continue;

      const range = DocumentLocation.ToRange(item.location.position, document, item.id.length);
      receiver.push(Location.create(document.uri, range));
    }

    return receiver;
  }
}
