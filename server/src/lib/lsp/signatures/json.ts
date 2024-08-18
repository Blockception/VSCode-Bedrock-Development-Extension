import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { getCurrentString } from "../../minecraft/json/functions";
import { IsMolang } from "../../minecraft/molang/functions";
import { TextDocument } from "../documents/text-document";

import * as Commands from "./minecraft/commands";
import * as Molang from "./minecraft/molang/main";

export function provideJsonSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined {
  const text = doc.getText();
  const cpos = doc.offsetAt(cursor);
  const range = getCurrentString(text, cpos);

  if (!range) return;
  let property = text.substring(range.start, range.end);

  if (IsMolang(property)) {
    if (property.startsWith("/")) {
      //On command
      property = property.substring(1);
      range.start++;

      return Commands.provideSignature(property, range.start, cpos, doc);
    } else if (property.startsWith("@s")) {
      //On event
      return MolangEventSignature;
    } else {
      //On other molang
      return Molang.provideSignature({ text: property, offset: range.start }, cpos);
    }
  }

  return undefined;
}

const MolangEventSignature: SignatureHelp = {
  activeParameter: 1,
  activeSignature: 0,
  signatures: [
    {
      label: "Molang Event",
      activeParameter: 1,
      documentation: "A molang event to launch on the entity",
      parameters: [
        { label: "@s", documentation: "The selector aim at" },
        { label: "< event >", documentation: "The event to launch" },
      ],
    },
  ],
};
