import { URI } from "vscode-uri";

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

export function GetFilepath(Uri: string): string {
  let uri = URI.file(decodeURI(Uri)).fsPath;

  if (uri.startsWith("\\")) uri = uri.slice(1, uri.length);

  return uri;
}
