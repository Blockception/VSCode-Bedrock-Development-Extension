import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { IsMolang } from "../Molang/include";
import { GetCurrentString } from "../Types/Document/Json Functions";
import { TextDocument } from "../Types/Document/TextDocument";
import { ProvideMcfunctionCommandSignature } from "../Types/Minecraft/Behavior/Functions/include";

export function ProvideJsonSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined {
  let text = doc.getText();
  let Range = GetCurrentString(text, doc.offsetAt(cursor));

  if (!Range) return;
  let property = text.substring(Range.start, Range.end);

  if (IsMolang(property)) {
    if (property.startsWith("/")) {
      //On command
      property = property.substring(1);
      Range.start++;
      return ProvideMcfunctionCommandSignature(property, doc.positionAt(Range.start), cursor, doc);
    } else if (property.startsWith("@s")) {
      //On event
    } else {
      //On other molang
    }
  }

  return undefined;
}
