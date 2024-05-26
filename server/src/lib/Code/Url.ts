import { URI } from "vscode-uri";

//Format that vscode sends:
//file:///f%3A/folder/behavior_packs/temp-bp/blocks/example.block.json

export namespace Vscode {
  /**
   *
   * @param path
   * @returns
   */
  export function FromFs(path: string): string {
    if (isVscode(path)) {
      return path.replace(/\\/gi, "//");
    }

    return URI.file(path).toString();
  }

  export function join(path: string, ...combine: string[]): string {
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    };

    for (const c of combine) {
      if (c.startsWith("/")) {
        path += c;
      } else {
        path += "/" + c;
      }
    }
    

    return path;
  }

  /**
   *
   * @param uri
   * @returns
   */
  export function isVscode(uri: string): boolean {
    if (uri.startsWith("file:///")) return true;
    if (uri.startsWith("file:\\\\\\")) return true;

    return false;
  }
}

export namespace Fs {
  /**From something like file:///
   * @param uri
   * @returns
   */
  export function FromVscode(uri: string): string {
    return URI.parse(uri, false).fsPath;
  }
}
