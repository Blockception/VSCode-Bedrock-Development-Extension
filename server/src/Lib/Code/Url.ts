import path from "path";
import { URI } from "vscode-uri";

/**
 *
 * @param uri
 * @returns
 */
export function VscodeUniformUrl(uri: string): string {
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
export function GetVscodeFilepath(uri: string): string {
  uri = URI.file(uri).fsPath;
  uri = uri.replace(/\\/g, "/");

  if (uri.startsWith("/")) uri = uri.slice(1, uri.length);

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

/**
 *
 * @param folder
 * @returns
 */
export function VscodeUniformFolder(folder: string): string {
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

/**
 *
 * @param uri
 * @returns
 */
export function UniformUrl(uri: string): string {
  return UniformFs(uri);
}

/**
 *
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

/**
 *
 * @param folder
 * @returns
 */
export function UniformFolder(folder: string): string {
  return UniformFs(folder);
}

export function UniformFs(uri: string): string {
  uri = uri.replace("%3A", ":");
  uri = path.normalize(uri);
  const temp = URI.parse(uri, false);
  uri = temp.fsPath;

  while (uri.startsWith(path.sep)) {
    uri = uri.slice(1);
  }

  return uri;
}
