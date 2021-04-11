export function IsInteger(text: string): boolean {
  let match = text.match(/^[\-\d]*$/);

  if (match) {
    return true;
  }

  return false;
}
