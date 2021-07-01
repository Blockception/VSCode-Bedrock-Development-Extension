import { UniformFolder } from "../../../Code/Url";

export function GetResourcePack(uri: string, subfolder: string): string {
  uri = UniformFolder(uri);

  const index = uri.indexOf("/" + subfolder + "/");

  if (index < 0) uri = uri;
  else uri = uri.substring(0, index);

  return uri;
}
