import { SignatureHelp } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { IsMolang } from "../Molang/include";
import { GetCurrentString } from "../Types/Document/Json Functions";
import { TextDocument } from "../Types/Document/TextDocument";
import { ProvideMcfunctionCommandSignature } from "../Minecraft/BehaviorPack/Functions/include";

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
      //TODO add molang support
    } else {
      //On other molang
      //TODO add molang support
    }
  }

  return undefined;
}
