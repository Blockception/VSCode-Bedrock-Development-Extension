import { SignatureHelp } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { Json } from "../Code/include";
import { IsMolang } from "../Molang/include";
import { ProvideMcfunctionCommandSignature } from "../Types/Minecraft/Behavior/Functions/include";

export function ProvideJsonSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined {
  let text = doc.getText();
  let Range = Json.GetCurrentString(text, doc.offsetAt(cursor));

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
