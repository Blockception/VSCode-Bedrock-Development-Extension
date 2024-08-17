import { Types } from "bc-minecraft-bedrock-types";
import { DocumentLocation } from "bc-minecraft-bedrock-types/lib/src/types";
import { Location } from "vscode-languageserver-types";
import { IDocumentManager } from "../lsp/documents/manager";

export namespace References {
  /**
   * Converts the given locations or references into resolved locations
   * @param items The items to check or filter or convert
   * @param documents The documents manager to use to lookup documents, and potentially use to lookup references
   * @returns A list of locations
   */
  export function convertLocation(
    items: ((Types.Locatable & Types.Identifiable) | Location | undefined)[],
    documents: IDocumentManager
  ): Location[] {
    function mapItem(item: (Types.Locatable & Types.Identifiable) | Location | undefined) {
      if (Location.is(item) || item === undefined) return item;

      const document = documents.get(item.location.uri);
      if (!document) return;

      const range = DocumentLocation.ToRange(item.location.position, document, item.id.length);
      return Location.create(document.uri, range);
    }

    return items.map(mapItem).filter((item) => item !== undefined);
  }
}
