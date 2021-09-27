import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { GetCurrentString } from "../Minecraft/Json/Functions";
import { TextDocument } from "../Types/Document/TextDocument";
import { Commands, Mcfunction, Molang } from "../Minecraft/include";

export function ProvideJsonSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined {
  let text = doc.getText();
  let Range = GetCurrentString(text, doc.offsetAt(cursor));

  if (!Range) return;
  let property = text.substring(Range.start, Range.end);

  if (Molang.IsMolang(property)) {
    if (property.startsWith("/")) {
      //On command
      property = property.substring(1);
      Range.start++;

      return Commands.Command.ProvideSignature(property, Range.start, doc.offsetAt(cursor), doc);
    } else if (property.startsWith("@s")) {
      //On event
      //TODO add molang support
    } else {
      //On other molang
      //TODO add molang support
    }
  }

  return undefined;
}
