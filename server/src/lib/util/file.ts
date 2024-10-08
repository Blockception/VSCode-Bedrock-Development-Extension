import path from "path";

/**
 *
 * @param filepath
 * @returns
 */
export function getFilename(filepath: string): string {
  const filename = path.basename(filepath);
  const extension = path.extname(filename);
  const result = filename.slice(0, filename.length - extension.length);

  return result.trim();
}

/**
 *
 * @param filepath
 * @returns
 */
export function getBasename(filepath: string): string {
  return path.basename(filepath).trim();
}

/**
 *
 * @param filepath
 * @returns
 */
export function getDirectory(filepath: string): string {
  filepath = filepath.replace(/\\/g, "/");
  const index = filepath.lastIndexOf("/");

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

export function getParent(uri: string): string {
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
