export interface TextRange {
  start: number;
  end: number;
}

export function GetCurrentElement(Text: string, cursor: number): TextRange | undefined {
  let StartIndex = -1;
  let Instring = false;

  for (let Index = cursor; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      Instring = true;
      StartIndex = Index + 1;
      break;
    } else if (c === "," || c === ":") {
      StartIndex = Index + 1;
      break;
    }
  }

  if (StartIndex < 0) {
    return undefined;
  }

  let EndIndex = -1;

  for (let Index = StartIndex; Index < Text.length; Index++) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      EndIndex = Index;
      break;
    } else if (Instring == false && (c === "," || c === ":")) {
      EndIndex = Index;
      break;
    }
  }

  if (EndIndex < 0) {
    return undefined;
  }

  return { start: StartIndex, end: EndIndex };
}

export function GetCurrentString(Text: string, cursor: number): TextRange | undefined {
  let StartIndex = -1;

  for (let Index = cursor - 1; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      StartIndex = Index + 1;
      break;
    }
  }

  if (StartIndex < 0) {
    return undefined;
  }

  let EndIndex = -1;

  for (let Index = StartIndex; Index < Text.length; Index++) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      EndIndex = Index;
      break;
    }
  }

  if (EndIndex < 0) {
    return undefined;
  }

  return { start: StartIndex, end: EndIndex };
}

export function GetStartString(Text: string, cursor: number): number {
  for (let Index = cursor; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      return Index;
    }
  }

  return -1;
}

export function IsProperty(Text: string, startindex: number): boolean {
  for (let Index = startindex; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === ":") {
      return true;
    } else if (c.trim() === "") continue;
    else break;
  }

  return false;
}
