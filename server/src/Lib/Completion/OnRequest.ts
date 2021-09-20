import { CompletionParams, CompletionList, CompletionItem } from "vscode-languageserver";
import { Languages } from "../Constants";
import { GetDocument } from "../Types/Document/include";
import { CompletionBuilder } from "./Builder";
import { Json, Language, Mcfunction, MCProject, Molang } from "../Minecraft/include";
import { SimpleContext } from "../Code/SimpleContext";

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
  const doc = GetDocument(params.textDocument.uri);
  const builder = new CompletionBuilder();
  const pos = params.position;
  const context = SimpleContext.create(doc, builder);

  switch (doc.languageId) {
    case Languages.McLanguageIdentifier:
      Language.ProvideCompletion(context, pos);
      break;

    case Languages.McFunctionIdentifier:
      Mcfunction.ProvideCompletion(context, pos);
      break;

    case Languages.McProjectIdentifier:
      MCProject.ProvideCompletion(context, pos);
      break;

    case Languages.McMolangIdentifier:
      Molang.ProvideDocCompletion(context, pos);
      break;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      Json.ProvideCompletionDocument(context, pos);
      break;
  }

  const List: CompletionList = { isIncomplete: false, items: [] };
  List.items = removeDuplicate(builder.items);

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
