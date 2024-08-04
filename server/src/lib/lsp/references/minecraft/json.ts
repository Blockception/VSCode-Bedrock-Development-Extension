import { Location, Range } from "vscode-languageserver-protocol";
import { getCurrentElement } from "../../../minecraft/json/functions";
import { IsMolang } from "../../../minecraft/molang/functions";
import { OffsetWord } from "bc-vscode-words";
import { ParameterType } from "bc-minecraft-bedrock-command";
import { References } from "../../../util/references";
import { TextDocument } from "../../documents/text-document";
import { ReferenceContext } from "../context";
import { Context } from "../../context/context";

import * as Command from "./commands";
import * as Molang from "./molang";

export async function provideReferences(context: Context<ReferenceContext>): Promise<Location[] | undefined> {
  const { document, position } = context;

  const text = document.getText();
  const elementRange = getCurrentElement(text, document.offsetAt(position));
  if (!elementRange) return undefined;

  const value = new OffsetWord(text.slice(elementRange.start, elementRange.end), elementRange.start);
  const result: Location[] = [];

  //Find references in document
  if (IsMolang(value.text)) {
    //Command
    if (value.text.startsWith("/")) {
      return Command.provideReferences(context, new OffsetWord(value.text.slice(1), value.offset + 1));
    }
    //Event
    else if (value.text.startsWith("@")) {
      const references = await context.database.findReferences(value.text.slice(2).trim(), [ParameterType.event]);
      return References.ConvertLocation(references, context.documents);
    }
    //Molang
    else {
      return Molang.provideReferences(context, value);
    }
  } else {
    ReferencesInDocument(value, document, result);
    const out = context.database.findReference(value.text);

    if (out) {
      result.push(...References.ConvertLocation([out], context.documents));
    }
  }

  return result;
}

function ReferencesInDocument(value: OffsetWord, doc: TextDocument, receiver: Location[]) {
  const Text = doc.getText();
  let Index = value.offset;
  const start = value.offset;
  const length = value.text.length;
  const end = value.offset + length;

  while (Index > -1) {
    if (Index < start || Index > end) {
      receiver.push(Location.create(doc.uri, Range.create(doc.positionAt(Index), doc.positionAt(Index + length))));
    }

    Index = Text.indexOf(value.text, Index + length);
  }
}
