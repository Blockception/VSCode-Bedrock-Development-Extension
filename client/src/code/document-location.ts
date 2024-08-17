import { Position, Range, TextDocument } from "vscode";
import { Character } from "./character";

/**
 * @param position
 * @param doc
 * @returns
 */
export function GetRange(position: string | number | Position, doc: TextDocument): Range {
  if (typeof position === "string") return resolveJsonPath(position, doc);

  let Start: Position;
  let End: Position | undefined = undefined;

  //If document location is already a position, then grab the offset to start at
  if (isPosition(position)) {
    Start = position;
    position = doc.offsetAt(position);
    //If document location is already an offset, then grab the start position
  } else if (OffsetWord.is(position)) {
    Start = doc.positionAt(position.offset);
    End = doc.positionAt(position.text.length + position.offset);

    return new Range(Start, End);
  } else {
    Start = doc.positionAt(position);
  }

  const text = doc.getText();

  for (let I = position + 1; I < text.length; I++) {
    const c = text.charCodeAt(I);

    //If character is a letter or number then keep going until we find something else
    if (Character.IsLetterCode(c) || Character.IsNumberCode(c)) continue;

    //Dashes and underscore are to be respected
    switch (c) {
      case Character.Character_dash:
      case Character.Character_underscore:
      case Character.Character_forwardslash:
      case Character.Character_column:
        continue;
    }

    //Something has been found that is not considered a "word"
    End = doc.positionAt(I);
    break;
  }

  //If end is still undefined then make atleast one character big
  if (!End) {
    End = new Position(Start.line, Start.character + 1);
  }

  return new Range(Start, End);
}

export function GetPosition(position: string | number | Position | OffsetWord, doc: TextDocument): Position {
  if (isPosition(position)) return position;
  if (typeof position === "string") return resolveJsonPath(position, doc).start;
  if (OffsetWord.is(position)) return doc.positionAt(position.offset);

  return doc.positionAt(position);
}

function isPosition(value: any): value is Position {
  if (typeof value === "object") {
    if (typeof value.character === "number" && typeof value.line === "number") return true;
  }

  return false;
}

interface OffsetWord {
  text: string;
  offset: number;
}

namespace OffsetWord {
  export function is(value: any): value is OffsetWord {
    if (typeof value === "object") {
      if (typeof value.text === "string" && typeof value.offset === "number") return true;
    }

    return false;
  }
}

export function resolveJsonPath(position: string, doc: TextDocument): Range {
  const index = position.lastIndexOf("/");
  const length = index > -1 ? position.length - index : position.length;

  const offset = resolve(doc, position);

  const start = doc.positionAt(offset);
  const end = doc.positionAt(offset + length);

  return new Range(start, end);
}

export function resolve(text: string | { getText(): string }, path: string): number {
  if (typeof text === "object") text = text.getText();

  const s = path.split(/[\\/]/);
  let index = 0;

  for (let I = 0; I < s.length; I++) {
    const elem = s[I];

    if (!Number.isInteger(elem) && elem !== "") {
      const t = text.indexOf(elem, index);
      if (t > -1) index = t;
    }
  }

  return index;
}
