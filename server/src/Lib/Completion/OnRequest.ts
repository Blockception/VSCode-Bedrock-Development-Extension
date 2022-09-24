import { CompletionBuilder } from "./Builder";
import { CompletionParams, CompletionList, CompletionItem } from "vscode-languageserver";
import { Console } from "../Manager";
import { GetDocument } from "../Types/Document/Document";
import { Languages } from "../Constants";
import { SimpleContext } from "../Code/SimpleContext";

import * as Json from "../Minecraft/Json/Completion";
import * as Language from "../Minecraft/Language/Completion";
import * as Mcfunction from "../Minecraft/Mcfunction/Completion";
import * as MCProject from "../Minecraft/MCProject/Completion";
import * as Molang from "../Minecraft/Molang/Completion";

/**Handle request
 * @param params
 * @returns
 */
export async function OnCompletionRequestAsync(
  params: CompletionParams
): Promise<CompletionItem[] | CompletionList | undefined> {
  return Console.request("Completion", Promise.resolve(OnCompletionRequest(params)));
}

/**
 *
 * @param params
 * @returns
 */
export async function OnCompletionResolveRequestAsync(params: CompletionItem): Promise<CompletionItem | undefined> {
  return Promise.resolve(params);
}

/**Processes request
 * @param params
 * @returns
 */
function OnCompletionRequest(params: CompletionParams): CompletionList | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

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
