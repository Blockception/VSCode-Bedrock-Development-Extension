export function GetFilename(filepath: string): string {
  filepath = filepath.replace(/\\/g, "//");
  let index = filepath.lastIndexOf("/");

  if (index > -1) {
    filepath = filepath.substring(index + 1, filepath.length);
  }

  index = filepath.lastIndexOf(".");

  if (index > -1) {
    filepath = filepath.substring(0, index);
  }

  return filepath.trim();
}

export function getExtension(filepath: string): string {
  let index = filepath.lastIndexOf(".");

  if (index < 0) return "";

  return filepath.substring(index, filepath.length).trim();
}

export function GetParent(uri: string): string {
  let Index = uri.lastIndexOf("\\");

  if (Index > -1) {
    return uri.slice(0, Index + 1);
  }

  Index = uri.lastIndexOf("/");

  if (Index > -1) {
    return uri.slice(0, Index + 1);
  }

  return uri;
}
