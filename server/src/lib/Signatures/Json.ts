import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { GetCurrentString } from "../Minecraft/Json/Functions";
import { TextDocument } from "../Types/Document/TextDocument";
import { Commands, Molang } from "../Minecraft";

export function provideJsonSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined {
  let text = doc.getText();
  const cpos = doc.offsetAt(cursor);
  let Range = GetCurrentString(text, cpos);

  if (!Range) return;
  let property = text.substring(Range.start, Range.end);

  if (Molang.IsMolang(property)) {
    if (property.startsWith("/")) {
      //On command
      property = property.substring(1);
      Range.start++;

      return Commands.Command.provideSignature(property, Range.start, cpos, doc);
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


const MolangEventSignature : SignatureHelp = {
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