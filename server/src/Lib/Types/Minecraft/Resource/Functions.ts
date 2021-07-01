export function GetResourcePack(uri: string, subfolder: string): string {
  uri = uri.replace(/\\/gi, "/");
  uri = decodeURI(uri);

  let index = uri.indexOf("/" + subfolder + "/");
  var path;

  if (index < 0) path = uri;
  else path = uri.substring(0, index);

  if (path.startsWith("file:///")) path = path.substring(8);
  else if (path.startsWith("file://")) path = path.substring(7);

  path = path.replace("%3A", ":");

  if (!path.endsWith("/")) path += "/";

  return path;
}
