import { Character } from "../Code/include";

export function IsMolang(text: string): boolean {
  if (text.startsWith("@s")) return true;

  if (text.startsWith("/")) {
    let matches = text.match(/^\/[a-z]+ /);

    if (matches) return true;

    return false;
  }

  //general test
  let matches = text.match(/(([Qq]uery|[Mm]ath|[Vv]ariable|[Tt]exture|[tT]emp|[Gg]eometry|[Mm]aterial|[Aa]rray|c|q|v|t)\.[A-Za-z_]+|->|\bthis\b)/);

  if (matches) return true;

  return false;
}

export function GetPreviousWord(text: string, cursor: number): string {
  let endIndex = cursor;

  if (text.charAt(endIndex - 1) === ".") endIndex = cursor - 1;

  let Index;
  for (Index = endIndex - 1; Index > -1; Index--) {
    const c = text.charAt(Index);

    if (Character.IsLetter(c) || Character.IsNumber(c) || c === "_") continue;

    break;
  }

  return text.substring(Index + 1, endIndex);
}
