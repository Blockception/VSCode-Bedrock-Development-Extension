export function IsFloat(text: string): boolean {
  let match = text.match(/^[\-\.\d]*$/);

  if (match) {
    return true;
  }

  return false;
}
