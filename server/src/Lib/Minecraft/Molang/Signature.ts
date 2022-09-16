import { OffsetWord } from "bc-vscode-words";
import { Position, SignatureHelp } from "vscode-languageserver";
import { Offset } from "../../Code/Offset";
import { TextDocument } from "../../Types/Document/TextDocument";
import { CreateMolangSetWords } from ".";

import * as Contexts from "./Contexts/Signature";
import * as Geometry from "./Geometry/Signature";
import * as Material from "./Material/Signature";
import * as Math from "./Math/Signature";
import * as Query from "./Query/Signature";
import * as Temps from "./Temps/Signature";
import * as Textures from "./Texture/Signature";
import * as Variables from "./Variables/Signature";

/**
 *
 * @param doc
 * @param cursor
 * @returns
 */
export function ProvideDocSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined {
  const text = doc.getText();
  const w: OffsetWord = { offset: 0, text: text };
  const cpos = doc.offsetAt(cursor);

  return ProvideSignature(w, cpos, doc);
}

/**
 *
 * @param text
 * @param cursor
 * @param doc
 * @returns
 */
export function ProvideSignature(text: OffsetWord, cursor: number, doc: TextDocument): SignatureHelp | undefined {
  const words = CreateMolangSetWords(text.text, text.offset);

  for (let I = 0; I < words.length; I++) {
    const word = words[I];
    if (Offset.IsWithin(word, cursor)) {
      return ProvideWordSignature(text);
    }
  }

  return undefined;
}

/**
 *
 * @param text
 * @param doc
 * @returns
 */
export function ProvideWordSignature(text: OffsetWord): SignatureHelp | undefined {
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
      return Contexts.ProvideSignature(sub);

    case "q":
    case "query":
      return Query.ProvideSignature(sub);

    case "m":
    case "math":
      return Math.ProvideSignature(sub);

    case "geometry":
      return Geometry.ProvideSignature(sub);

    case "material":
      return Material.ProvideSignature(sub);

    case "v":
    case "variable":
      return Variables.ProvideSignature(sub);

    case "t":
    case "texture":
      return Textures.ProvideSignature(sub);

    case "temp":
      return Temps.ProvideSignature(sub);
  }

  return undefined;
}
