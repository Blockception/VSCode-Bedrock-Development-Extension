import { CompletionParams, CompletionList, CompletionItem } from "vscode-languageserver";
import { Languages } from "../Constants";
import { GetDocument } from "../Types/Document/include";
import { OnCompletionMCProject } from "../Minecraft/MCProject/Completion";
import { CompletionBuilder } from "./Builder";
import { OnCompletionJson } from "./Json";
import { OnCompletionLanguage } from "./Language";
import { OnCompletionMcFunction } from "./Mcfunction";
import { OnCompletionMolangRequest } from "./Molang/include";

/**Handle request
 * @param params
 * @returns
 */
export async function OnCompletionRequestAsync(params: CompletionParams): Promise<CompletionItem[]> {
  return new Promise((resolve, reject) => {
    resolve(OnCompletionRequest(params).items);
  });
}

/**
 *
 * @param params
 * @returns
 */
export async function OnCompletionResolveRequestAsync(params: CompletionItem): Promise<CompletionItem> {
  return new Promise<CompletionItem>((resolve, reject) => resolve(params));
}

/**Processes request
 * @param params
 * @returns
 */
function OnCompletionRequest(params: CompletionParams): CompletionList {
  const Doc = GetDocument(params.textDocument.uri);
  const Builder = new CompletionBuilder(Doc);
  const Pos = params.position;

  switch (Doc.languageId) {
    case Languages.McLanguageIdentifier:
      OnCompletionLanguage(Doc, Pos, Builder);
      break;

    case Languages.McFunctionIdentifier:
      OnCompletionMcFunction(Doc, Pos, Builder);
      break;

    case Languages.McProjectIdentifier:
      OnCompletionMCProject(Doc, Pos, Builder);
      break;

    case Languages.McMolangIdentifier:
      OnCompletionMolangRequest(Doc, Pos, Builder);
      break;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      OnCompletionJson(Doc, Doc.offsetAt(Pos), Builder);
      break;
  }

  const List: CompletionList = { isIncomplete: false, items: [] };
  List.items = removeDuplicate(Builder.items);

  return List;
}

function removeDuplicate(items: CompletionItem[]): CompletionItem[] {
  const Length = items.length;
  const Out: CompletionItem[] = [];

  for (let I = 0; I < Length; I++) {
    const Current = items[I];

    if (!hasItem(Out, Current)) {
      Out.push(Current);
    }
  }

  return Out;
}

function hasItem(items: CompletionItem[], item: CompletionItem): boolean {
  const label = item.label;

  for (let I = 0; I < items.length; I++) {
    if (label == items[I].label) return true;
  }

  return false;
}
