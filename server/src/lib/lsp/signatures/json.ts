import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { getCurrentString } from "../../minecraft/json/functions";
import { TextDocument } from "../documents/text-document";
import { IsMolang } from "../../minecraft/molang/functions";

import * as Commands from "./minecraft/commands";
import * as Molang from "./minecraft/molang/main";

export function provideJsonSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined {
  let text = doc.getText();
  const cpos = doc.offsetAt(cursor);
  let Range = getCurrentString(text, cpos);

  if (!Range) return;
  let property = text.substring(Range.start, Range.end);

  if (IsMolang(property)) {
    if (property.startsWith("/")) {
      //On command
      property = property.substring(1);
      Range.start++;

      return Commands.provideSignature(property, Range.start, cpos, doc);
    } else if (property.startsWith("@s")) {
      //On event
      return MolangEventSignature;
    } else {
      //On other molang
      return Molang.provideSignature({ text: property, offset: Range.start }, cpos, doc);
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
