import * as vstd from "vscode-languageserver-textdocument";
import * as vscode from "vscode-languageserver";
import { Types } from "bc-minecraft-bedrock-types";
import { Range } from "vscode-languageserver";
import { Character } from "./Character";

/**
 *
 * @param position
 * @param doc
 * @returns
 */
export function GetRange(position: Types.DocumentLocation, doc: vstd.TextDocument): Range {
  if (Types.JsonPath.is(position)) {
    return resolveJsonPath(position, doc);
  }

  let Start: Types.Position;
  let End: Types.Position | undefined = undefined;

  //If document location is already a position, then grab the offset to start at
  if (Types.Position.is(position)) {
    Start = position;
    position = doc.offsetAt(position);
    //If document location is already an offset, then grab the start position
  } else if (Types.OffsetWord.is(position)) {
    Start = doc.positionAt(position.offset);
    End = doc.positionAt(position.text.length + position.offset);

    return { start: Start, end: End };
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
    End = { character: Start.character + 1, line: Start.line };
  }

  return { start: Start, end: End };
}

export function GetPosition(position: Types.DocumentLocation, doc: vstd.TextDocument): vstd.Position {
  if (Types.Position.is(position)) return position;
  if (Types.JsonPath.is(position)) return resolveJsonPath(position, doc).start;
  if (Types.OffsetWord.is(position)) return doc.positionAt(position.offset); 
  
  return doc.positionAt(position);
}

export function resolveJsonPath(position: string, doc: vstd.TextDocument): Range {
  const index = position.lastIndexOf("/");
  const length = index > -1 ? position.length - index : position.length;

  if (index === -1 && (doc.languageId === "json" || doc.languageId === "jsonc")) {
    position = '"' + position + '"';
  }

  let offset = doc.getText().indexOf(position);

  if (offset < 0) {
    offset = Types.JsonPath.resolve(doc, position);
  }

  const start = doc.positionAt(offset);
  const end = doc.positionAt(offset + length);

  return { start: start, end: end };
}
