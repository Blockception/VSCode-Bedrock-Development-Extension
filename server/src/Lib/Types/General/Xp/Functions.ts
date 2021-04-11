export function IsXpLevel(text: string): boolean {
  let match = text.match(/^([\-\d]*|[\-\d]*[Ll])$/);

  if (match) {
    return true;
  }

  return false;
}
