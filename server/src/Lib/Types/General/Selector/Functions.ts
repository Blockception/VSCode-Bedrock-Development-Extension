import { LocationWord } from "bc-vscode-words";
import { ParameterOptions } from "../../Commands/Parameter/include";

export function IsSelector(value: string, Options: ParameterOptions | undefined): boolean {
  if (value.startsWith("@")) return true;

  if (Options) {
    if (Options.wildcard === true) {
      if (value === "*") return true;
    }

    if (Options.allowFakePlayers === true) {
      if (value.startsWith('"') && value.endsWith('"')) return true;

      if (value.includes(" ")) {
        return false;
      }
      return true;
    }
  }

  return false;
}

export function InSelector(selector: LocationWord, pos: number): boolean {
  if (selector.location.range.start.character + 2 <= pos && pos < selector.location.range.end.character) return true;

  return false;
}

export function InScore(selector: LocationWord, pos: number): boolean {
  let Index = selector.text.indexOf("scores");

  if (Index < 0) return false;

  //scores={}
  if (pos < Index + 8) {
    return false;
  }

  Index = selector.text.indexOf("}") + selector.location.range.start.character;

  if (Index < 0) return true;

  return pos <= Index;
}

export function GetCurrentAttribute(selector: LocationWord, pos: number): string {
  let StartIndex = pos - selector.location.range.start.character;

  while (StartIndex > 2) {
    let C = selector.text.charAt(StartIndex);

    if (C === ",") {
      break;
    }

    StartIndex--;
  }

  StartIndex++;
  let EndIndex = selector.text.indexOf("=", StartIndex);

  if (EndIndex < 0) EndIndex = selector.text.length;

  return selector.text.slice(StartIndex, EndIndex).trim();
}

export function IsFakePlayer(text: string): boolean {
  return !text.startsWith("@") && text !== "*";
}

export function IsEditingValue(selector: LocationWord, pos: number): boolean {
  let diff = pos - selector.location.range.start.character;

  if (diff > 0) {
    if (selector.text.charAt(diff - 1) === "=") {
      return true;
    }
  }

  return false;
}
