import { Offset } from "../../../../Code/Offset";
import { OffsetWord } from "bc-vscode-words";
import { Position, SignatureHelp } from "vscode-languageserver";
import { TextDocument } from "../../../documents/text-document";

import * as Contexts from "./contexts";
import * as Geometry from "./geometries";
import * as Material from "./materials";
import * as Math from "./math";
import * as Query from "./queries";
import * as Temps from "./temps";
import * as Textures from "./textures";
import * as Variables from "./variables";
import { CreateMolangSetWords } from "../../../../minecraft/molang/words";

/**
 *
 * @param doc
 * @param cursor
 * @returns
 */
export function provideDocSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined {
  const text = doc.getText();
  const w: OffsetWord = { offset: 0, text: text };
  const cpos = doc.offsetAt(cursor);

  return provideSignature(w, cpos, doc);
}

/**
 *
 * @param text
 * @param cursor
 * @param doc
 * @returns
 */
export function provideSignature(text: OffsetWord, cursor: number, doc: TextDocument): SignatureHelp | undefined {
  const words = CreateMolangSetWords(text.text, text.offset);

  for (let I = 0; I < words.length; I++) {
    const word = words[I];
    if (Offset.IsWithin(word, cursor)) {
      return provideWordSignature(text);
    }
  }

  return undefined;
}

/**
 *
 * @param text
 * @returns
 */
export function provideWordSignature(text: OffsetWord): SignatureHelp | undefined {
  const index = text.text.indexOf(".");
  let main: string | undefined = undefined;
  let sub: string | undefined = undefined;

  if (index === -1) {
    main = text.text;
  } else {
    main = text.text.substring(0, index);
    sub = text.text.substring(index + 1);
  }

  switch (main) {
    case "c":
    case "contexts":
      return Contexts.provideSignature(sub);

    case "q":
    case "query":
      return Query.provideSignature(sub);

    case "m":
    case "math":
      return Math.provideSignature(sub);

    case "geometry":
      return Geometry.provideSignature(sub);

    case "material":
      return Material.provideSignature(sub);

    case "v":
    case "variable":
      return Variables.provideSignature(sub);

    case "t":
    case "texture":
      return Textures.provideSignature(sub);

    case "temp":
      return Temps.provideSignature(sub);
  }

  return undefined;
}
