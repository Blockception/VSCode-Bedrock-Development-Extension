import { Data, MolangData } from "bc-minecraft-molang";
import { Hover, HoverParams, Range } from "vscode-languageserver-protocol";
import { Character } from "../../Code/Character";
import { TextDocument } from "../../Types/Document/TextDocument";
import { TextRange } from "../Json/Functions";

export function ProvideHover(doc: TextDocument, params: HoverParams): Hover | undefined {
  const line = doc.getLine(params.position.line);
  const offset = doc.offsetAt({ character: 0, line: params.position.line });
  const cursor = doc.offsetAt(params.position);
  const range: TextRange = { start: cursor, end: cursor + line.length };

  return ProvideHoverAt(
    line,
    range,
    offset,
    Range.create(params.position, { character: params.position.character, line: params.position.line })
  );
}

export function ProvideHoverAt(
  currentText: string,
  trange: TextRange,
  cursor: number,
  range: Range | undefined
): Hover | undefined {
  let startindex = cursor - trange.start;
  let dotindex = -1;

  for (; startindex >= 0; startindex--) {
    const c = currentText.charCodeAt(startindex);

    if (Character.IsLetterCode(c) || Character.IsNumberCode(c) || c === Character.Character_underscore) continue;
    if (c === Character.Character_dot) {
      dotindex = startindex;
      continue;
    }

    startindex++;
    break;
  }

  if (startindex < 0) startindex = 0;

  let endindex = cursor - trange.start;

  for (; endindex < currentText.length; endindex++) {
    const c = currentText.charCodeAt(endindex);

    if (Character.IsLetterCode(c) || Character.IsNumberCode(c) || c === Character.Character_underscore) continue;

    break;
  }

  const text = currentText.slice(startindex, endindex);

  if (dotindex > -1) {
    const main = currentText.slice(startindex, dotindex);
    const sub = currentText.slice(dotindex + 1, endindex);
    return ProvideHoverSpecific(main, sub);
  }

  return ProvideHoverSpecific(text);
}

export function ProvideHoverSpecific(
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

function findGen(data: string, range: Range | undefined = undefined, items: Data[]): Hover | undefined {
  for (let I = 0; I < items.length; I++) {
    const item = items[I];

    if (item.id === data && item.documentation) {
      return { contents: { value: item.documentation, kind: "markdown" }, range: range };
    }
  }

  return undefined;
}
