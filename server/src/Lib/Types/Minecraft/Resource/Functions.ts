export function GetResourcePack(uri: string, subfolder: string): string {
  let index = uri.indexOf("\\" + subfolder + "\\");
  if (index < 0) index = uri.indexOf("/" + subfolder + "/");

  var path;

  if (index < 0) path = uri;
  else path = uri.substring(0, index);

  if (path.startsWith("file:\\\\") || path.startsWith("file://")) path = path.substring(7, path.length);

  return path;
}
