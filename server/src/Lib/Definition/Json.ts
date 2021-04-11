import { Location } from "vscode-languageserver";
import { TextDocument, Position } from "vscode-languageserver-textdocument";
import { Json } from "../Code/include";
import { Database } from "../Database/include";

export function OnJsonDefinition(doc: TextDocument, pos: Position): Location[] | undefined {
  const Text = doc.getText();
  let ElementRange = Json.GetCurrentElement(Text, doc.offsetAt(pos));

  if (!ElementRange) return undefined;

  const ElementText = Text.slice(ElementRange.start, ElementRange.end).trim();

  if (ElementText === "") {
    return undefined;
  }

  let Out: Location[] = [];

  let Index = Text.indexOf(ElementText);
  const uri = doc.uri;

  while (Index > -1) {
    if (Index < ElementRange.start || Index > ElementRange.end) {
      Out.push({
        range: {
          start: doc.positionAt(Index),
          end: doc.positionAt(Index + ElementText.length),
        },
        uri: uri,
      });
    }

    Index = Text.indexOf(ElementText, Index + ElementText.length);
  }

  Database.Data.FindReference(ElementText, Out);

  return Out;
}
