/**
 *
 * @param text
 * @returns
 */
export function IsCoordinate(text: string): boolean {
  let match = text.match(/^[\~\^\+\-\d][\+\-\.\d]*$/);

  if (match) {
    return true;
  }

  return false;
}
