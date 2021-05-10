import { CompletionParams, CompletionList, CompletionItem } from "vscode-languageserver";
import { GetDocument } from "../Code/include";
import { Languages } from "../Constants";
import { OnCompletionMCProject } from "../Types/MCProject/Completion";
import { CompletionBuilder } from "./Builder";
import { OnCompletionJson } from "./Json";
import { OnCompletionLanguage } from "./Language";
import { OnCompletionMcFunction } from "./Mcfunction";

//Handle request
export async function OnCompletionRequestAsync(params: CompletionParams): Promise<CompletionItem[]> {
  return new Promise((resolve, reject) => {
    resolve(OnCompletionRequest(params).items);
  });
}

export async function OnCompletionResolveRequestAsync(params: CompletionItem): Promise<CompletionItem> {
  return new Promise<CompletionItem>((resolve, reject) => resolve(params));
}

//Processes request
function OnCompletionRequest(params: CompletionParams): CompletionList {
  let Builder = new CompletionBuilder();
  let Doc = GetDocument(params.textDocument.uri);
  let Pos = params.position;

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

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      OnCompletionJson(Doc, Doc.offsetAt(Pos), Builder);
      break;
  }

  let List: CompletionList = { isIncomplete: false, items: [] };
  List.items = removeDuplicate(Builder.items);

  return List;
}

function removeDuplicate(items: CompletionItem[]): CompletionItem[] {
  let Length = items.length;
  let Out: CompletionItem[] = [];

  for (let I = 0; I < Length; I++) {
    let Current = items[I];

    if (!hasItem(Out, Current)) {
      Out.push(Current);
    }
  }

  return Out;
}

function hasItem(items: CompletionItem[], item: CompletionItem): boolean {
  let label = item.label;

  for (let I = 0; I < items.length; I++) {
    if (label == items[I].label) return true;
  }

  return false;
}
