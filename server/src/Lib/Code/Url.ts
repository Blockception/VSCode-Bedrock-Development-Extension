import { URI } from "vscode-uri";

/**
 *
 * @param Uri
 * @returns
 */
export function UniformUrl(Uri: string): string {
  let Out: string;

  if (Uri.startsWith("file://")) {
    Uri = Uri.replace("file:///", "file://");
    Out = Uri;
    Out = Out.replace("%3A", ":");
  } else {
    Out = Uri.replace(/\\/g, "/");
    Out = encodeURI(Out);
    Out = "file://" + Out;
  }

  return Out;
}

/**
 *
 * @param Uri
 * @returns
 */
export function GetFilepath(Uri: string): string {
  let uri = URI.file(decodeURI(Uri)).fsPath;

  if (uri.startsWith("\\")) uri = uri.slice(1, uri.length);

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
