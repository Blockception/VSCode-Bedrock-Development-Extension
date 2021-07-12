import { URI } from "vscode-uri";

/**
 *
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

/**
 *
 * @param uri
 * @returns
 */
export function GetFilepath(uri: string): string {
  uri = URI.file(uri).fsPath;

  if (uri.startsWith("\\")) uri = uri.slice(1, uri.length);

  uri = uri.replace(/\\/g, "/");
  uri = decodeURI(uri);
  uri = uri.replace("%3A", ":");

  while (uri.startsWith("file:/")) {
    uri = uri.substring(6);
  }

  while (uri.startsWith("/")) {
    uri = uri.substring(1, uri.length);
  }

  return uri;
}

export function UniformFolder(folder: string): string {
  folder = folder.replace(/\\/gi, "/");
  folder = decodeURI(folder);

  if (folder.startsWith("file:///")) folder = folder.substring(8);
  else if (folder.startsWith("file://")) folder = folder.substring(7);

  folder = folder.replace("%3A", ":");

  if (!folder.endsWith("/")) folder += "/";
  return folder;
}
