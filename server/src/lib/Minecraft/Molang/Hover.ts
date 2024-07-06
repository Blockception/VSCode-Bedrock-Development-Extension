import { Data, MolangData, MolangFunction } from "bc-minecraft-molang";
import { Hover, HoverParams, Range } from "vscode-languageserver-protocol";
import { Character } from "../../Code/Character";
import { TextDocument } from "../../Types/Document/TextDocument";
import { TextRange } from "../Json/Functions";

export function provideHover(doc: TextDocument, params: HoverParams): Hover | undefined {
  const line = doc.getLine(params.position.line);
  const offset = doc.offsetAt({ character: 0, line: params.position.line });
  const cursor = doc.offsetAt(params.position);
  const range: TextRange = { start: cursor, end: cursor + line.length };

  return provideHoverAt(
    line,
    range,
    offset,
    Range.create(params.position, { character: params.position.character, line: params.position.line })
  );
}

export function provideHoverAt(
  currentText: string,
  textRange: TextRange,
  cursor: number,
  range: Range | undefined
): Hover | undefined {
  let startIndex = cursor - textRange.start;
  let dotIndex = -1;

  for (; startIndex >= 0; startIndex--) {
    const c = currentText.charCodeAt(startIndex);

    if (Character.IsLetterCode(c) || Character.IsNumberCode(c) || c === Character.Character_underscore) continue;
    if (c === Character.Character_dot) {
      dotIndex = startIndex;
      continue;
    }

    startIndex++;
    break;
  }

  if (startIndex < 0) startIndex = 0;

  let endIndex = cursor - textRange.start;

  for (; endIndex < currentText.length; endIndex++) {
    const c = currentText.charCodeAt(endIndex);

    if (Character.IsLetterCode(c) || Character.IsNumberCode(c) || c === Character.Character_underscore) continue;

    break;
  }

  const text = currentText.slice(startIndex, endIndex);

  if (dotIndex > -1) {
    const main = currentText.slice(startIndex, dotIndex).toLowerCase();
    const sub = currentText.slice(dotIndex + 1, endIndex).toLowerCase();
    return provideHoverSpecific(main, sub);
  }

  return provideHoverSpecific(text);
}

export function provideHoverSpecific(
  main: string,
  sub: string | undefined = undefined,
  range: Range | undefined = undefined
): Hover | undefined {
  switch (main) {
    //TODO animation
    //TODO controller
    //TODO geometry
    //TODO texture
    //TODO material

    case "c":
    case "context":
      if (sub) return findGen(sub, range, MolangData.Entities.Contexts);
      return { contents: "Molang context", range: range };

    case "m":
    case "math":
      if (sub) return findGen(sub, range, MolangData.General.Math);
      return { contents: "Molang math", range: range };

    case "q":
    case "query":
      if (sub) return findGen(sub, range, MolangData.General.Queries);
      return { contents: "Molang query", range: range };

    case "v":
    case "variable":
      //TODO go through ProjectData
      if (sub) return findGen(sub, range, MolangData.Entities.Variables);
      return { contents: "Molang variable", range: range };

    case "t":
    case "temp":
      //TODO go through ProjectData
      if (sub) return findGen(sub, range, MolangData.Entities.Temps);
      return { contents: "Molang temp", range: range };
  }

  return undefined;
}

function findGen(data: string, range: Range | undefined = undefined, items: MolangFunction[]): Hover | undefined {
  for (let I = 0; I < items.length; I++) {
    const item = items[I];

    if (item.id === data && item.documentation) {
      let doc = `${item.id}  \n\n${item.documentation}`;

      if (item.parameters) {
        doc += `\n\n**Parameters**:\n\n${item.parameters.map((p) => `- ${p.id}\n`).join("")}`;
      }
      if (item.deprecated) {
        doc += `\n\n**Deprecated**: ${item.deprecated}`;
      }
    

      return { contents: { value: doc, kind: "markdown" }, range: range };
    }
  }

  return undefined;
}
