import { Location, ReferenceParams } from "vscode-languageserver";
import { Database } from "../Database/include";
import { GetCurrentElement } from "../Types/Document/Json Functions";
import { TextDocument } from "../Types/Document/TextDocument";

export function ProvideJsonReferences(params: ReferenceParams, doc: TextDocument): Location[] | undefined {
  let pos = params.position;

  const Text = doc.getText();
  let ElementRange = GetCurrentElement(Text, doc.offsetAt(pos));

  if (!ElementRange) return undefined;

  const ElementText = Text.slice(ElementRange.start, ElementRange.end).trim();

  let Index = Text.indexOf(ElementText);
  let Out: Location[] = [];
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

  Database.ProjectData.FindReference(ElementText, Out);

  return Out;
}
