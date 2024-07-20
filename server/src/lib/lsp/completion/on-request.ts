import { createBuilder } from "./builder/builder";
import {
  CompletionParams,
  CompletionList,
  CompletionItem,
  CancellationToken,
  WorkDoneProgressReporter,
} from "vscode-languageserver";
import { Console } from "../../manager";
import { GetDocument } from "../documents/document";
import { Languages } from "@blockception/shared";
import { SimpleContext } from "../../util/simple-context";

import * as Json from "./minecraft/json/document";
import * as Language from "./minecraft/language/language";
import * as Mcfunction from "./minecraft/mcfunctions/mcfunctions";
import * as MCProject from "./minecraft/mcproject/mcproject";
import * as Molang from "./minecraft/molang/main";

export async function onCompletionRequestAsync(
  params: CompletionParams,
  token: CancellationToken,
  workDoneProgress: WorkDoneProgressReporter
): Promise<CompletionItem[] | CompletionList | undefined> {
  return Console.request("Completion", Promise.resolve(onCompletionRequest(params, token, workDoneProgress)));
}

export async function onCompletionResolveRequestAsync(params: CompletionItem): Promise<CompletionItem | undefined> {
  return Promise.resolve(params);
}

/**Processes request
 * @param params
 * @returns
 */
export function onCompletionRequest(
  params: CompletionParams,
  token: CancellationToken,
  workDoneProgress: WorkDoneProgressReporter
): CompletionList | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  const builder = createBuilder(token, workDoneProgress);
  const pos = params.position;
  const context = SimpleContext.create(doc, builder, doc.offsetAt(pos));

  switch (doc.languageId) {
    case Languages.McLanguageIdentifier:
      Language.provideCompletion(context, pos);
      break;

    case Languages.McFunctionIdentifier:
      Mcfunction.provideCompletion(context, pos);
      break;

    case Languages.McProjectIdentifier:
      MCProject.provideCompletion(context, pos);
      break;

    case Languages.McMolangIdentifier:
      Molang.provideDocCompletion(context, pos);
      break;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      Json.provideCompletionDocument(context, pos);
      break;
  }

  const List: CompletionList = { isIncomplete: false, items: [] };
  List.items = removeDuplicate(builder.getItems());

  return List;
}

function removeDuplicate(items: CompletionItem[]): CompletionItem[] {
  const Length = items.length;
  const out: CompletionItem[] = [];

  for (let I = 0; I < Length; I++) {
    const current = items[I];

    if (!hasItem(out, current)) {
      out.push(current);
    }
  }

  return out;
}

function hasItem(items: CompletionItem[], item: CompletionItem): boolean {
  const label = item.label;

  for (let I = 0; I < items.length; I++) {
    if (label == items[I].label) return true;
  }

  return false;
}
