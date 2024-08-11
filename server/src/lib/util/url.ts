import { URI as VS_URI } from "vscode-uri";

//Format that vscode sends:
//file:///f%3A/folder/behavior_packs/temp-bp/blocks/example.block.json

export namespace Vscode {
  /**
   *
   * @param path
   * @returns
   */
  export function fromFs(path: string): string {
    if (isVscode(path)) {
      return path.replace(/\\/gi, "//");
    }

    return VS_URI.file(path).toString();
  }

  export function join(path: string, ...combine: string[]): string {
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    for (const c of combine) {
      if (c.startsWith("/")) {
        path += c;
      } else {
        path += "/" + c;
      }
    }

    return path;
  }

  const vsUri = /^([a-zA-Z-09\-+]+:\/\/)/im;

  /**
   *
   * @param uri
   * @returns
   */
  export function isVscode(uri: string): boolean {
    if (vsUri.test(uri)) {
      return true;
    }

    return false;
  }
}

export namespace Fs {
  /**From something like file:///
   * @param uri
   * @returns
   */
  export function FromVscode(uri: string): string {
    return VS_URI.parse(uri, false).fsPath;
  }
}
