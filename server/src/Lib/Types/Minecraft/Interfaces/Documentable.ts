import { MarkupContent } from "vscode-languageserver";

export interface Documentable {
  /**
   * The identifier of this type of object
   */
  Documentation: MarkupContent;
}

export namespace Documentable {
  export function is(value: any): value is Documentable {
    if (value) {
      if (value.Documentation) {
        if (MarkupContent.is(value.Documentation)) {
          return true;
        }
      }
    }

    return false;
  }
}
