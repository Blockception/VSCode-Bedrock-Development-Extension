/**
 *
 * @param filepath
 * @returns
 */
export function GetFilename(filepath: string): string {
  filepath = filepath.replace(/\\/g, "/");
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

/**
 *
 * @param filepath
 * @returns
 */
export function GetDirectory(filepath: string): string {
  filepath = filepath.replace(/\\/g, "/");
  let index = filepath.lastIndexOf("/");

  if (index > -1) {
    filepath = filepath.substring(index + 1, filepath.length);
  }

  return filepath.trim();
}

/**
 *
 * @param filepath
 * @returns
 */
export function getExtension(filepath: string): string {
  const index = filepath.lastIndexOf(".");

  if (index < 0) return "";

  return filepath.substring(index, filepath.length).trim();
}

/**
 *
 * @param uri
 * @returns
 */

export function GetParent(uri: string): string {
  let Index = uri.lastIndexOf("/");

  if (Index > -1) {
    return uri.slice(0, Index + 1);
  }

  Index = uri.lastIndexOf("\\");

  if (Index > -1) {
    return uri.slice(0, Index + 1);
  }

  return uri;
}
