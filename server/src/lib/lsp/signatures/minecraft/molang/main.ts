import { OffsetWord } from "bc-vscode-words";
import { Position, SignatureHelp } from "vscode-languageserver";
import { CreateMolangSetWords } from "../../../../minecraft/molang/words";
import { TextDocument } from "../../../documents/text-document";

import * as Contexts from "./contexts";
import * as Geometry from "./geometries";
import * as Material from "./materials";
import * as Math from "./math";
import * as Query from "./queries";
import * as Temps from "./temps";
import * as Textures from "./textures";
import * as Variables from "./variables";

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

  return provideSignature(w, cpos);
}

/**
 *
 * @param text
 * @param cursor
 * @param doc
 * @returns
 */
export function provideSignature(text: OffsetWord, cursor: number): SignatureHelp | undefined {
  const words = CreateMolangSetWords(text.text, text.offset);

  let lastIndex = words.length - 1;
  for (; lastIndex >= 0; lastIndex--) {
    const r = provideWordSignature(words[lastIndex], cursor, words.slice(lastIndex + 1) ?? []);
    if (r) return r;
  }

  return undefined;
}

/**
 *
 * @param text
 * @returns
 */
export function provideWordSignature(text: OffsetWord, cursor: number, parameters: OffsetWord[]): SignatureHelp | undefined {
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
      return Query.provideSignature(sub, cursor, parameters);

    case "m":
    case "math":
      return Math.provideSignature(sub, cursor, parameters);

    case "geometry":
      return Geometry.provideSignature();

    case "material":
      return Material.provideSignature();

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
