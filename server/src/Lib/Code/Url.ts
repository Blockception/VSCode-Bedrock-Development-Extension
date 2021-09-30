import path from "path";
import { URI } from "vscode-uri";

export namespace Vscode {
  /**A vscode uniform uri
   * @param uri
   * @returns
   */
  export function UniformUrl(uri: string): string {
    uri = uri.replace(/\\/g, "/");

    while (uri.startsWith("/")) {
      uri = uri.substring(1, uri.length);
    }

    if (uri.startsWith("file:")) {
      if (uri.startsWith("file:///")) {
        //Nothing
      } else if (uri.startsWith("file://")) {
        uri = "file:///" + uri.substring(7, uri.length);
      } else if (uri.startsWith("file:/")) {
        uri = "file:///" + uri.substring(6, uri.length);
      }
    } else {
      uri = "file:///" + uri;
    }

    const temp = URI.parse(uri, false);
    uri = temp.toString();

    return uri;
  }

  /**A vscode uniform uri
   * @param uri
   * @returns
   */
  export function GetFilepath(uri: string): string {
    return UniformUrl(uri);
  }

  /**A vscode uniform uri
   * @param folder
   * @returns
   */
  export function UniformFolder(folder: string): string {
    folder = folder.replace(/\\/gi, "/");
    folder = decodeURI(folder);

    if (folder.startsWith("file:///")) folder = folder.substring(8);
    else if (folder.startsWith("file://")) folder = folder.substring(7);

    folder = folder.replace("%3A", ":");

    while (folder.endsWith("/")) {
      folder = folder.slice(0, folder.length - 1);
    }

    return folder;
  }
}

export namespace Fs {
  /**A fs uniform uri
   * @param uri
   * @returns
   */
  export function UniformUrl(uri: string): string {
    return UniformFs(uri);
  }

  /**A fs uniform filepath
   * @param uri
   * @returns
   */
  export function GetFilepath(uri: string): string {
    uri = uri.replace("%3A", ":");
    uri = decodeURI(uri);
    uri = path.normalize(uri);
    const temp = URI.file(uri);
    uri = temp.fsPath;

    while (uri.startsWith(path.sep)) {
      uri = uri.slice(1);
    }

    if (uri.startsWith("file:" + path.sep)) {
      uri = uri.slice(5 + path.sep.length);
    }

    return uri;
  }

  /**A fs uniform folder path
   * @param folder
   * @returns
   */
  export function UniformFolder(folder: string): string {
    return UniformFs(folder);
  }

  /**A uniform fs path
   * @param uri
   * @returns
   */
  export function UniformFs(uri: string): string {
    uri = uri.replace("%3A", ":");
    uri = path.normalize(uri);

    if (!uri.startsWith("file:")) {
      uri = "file://" + uri;
    }

    if (path.sep === "\\") {
      uri = uri.replace(/\//gi, path.sep);
    } else {
      uri = uri.replace(/\\/gi, path.sep);
    }

    const temp = URI.parse(uri, false);
    uri = temp.fsPath;

    while (uri.startsWith(path.sep)) {
      uri = uri.slice(1);
    }

    return uri;
  }
}
