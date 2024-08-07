import { createBuilder } from "./builder/builder";
import { GetDocument } from "../documents/document";
import { Languages } from "@blockception/shared";
import { SimpleContext } from "../../util/simple-context";
import {
  CompletionParams,
  CompletionList,
  CompletionItem,
  CancellationToken,
  WorkDoneProgressReporter,
} from "vscode-languageserver";

import * as Json from "./minecraft/json/document";
import * as Language from "./minecraft/language/language";
import * as Mcfunction from "./minecraft/mcfunctions/mcfunctions";
import * as MCProject from "./minecraft/mcproject/mcproject";
import * as Molang from "./minecraft/molang/main";
import { IExtendedLogger } from "../logger/logger";
import { ProjectData } from "bc-minecraft-bedrock-project";

export function onCompletionRequest(
  params: CompletionParams,
  token: CancellationToken,
  workDoneProgress: WorkDoneProgressReporter,
  logger: IExtendedLogger,
  projectData: ProjectData
): CompletionList | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  const builder = createBuilder(token, workDoneProgress);
  const pos = params.position;
  const context = SimpleContext.create(doc, builder, doc.offsetAt(pos), projectData, logger);

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

  return { isIncomplete: false, items: removeDuplicate(builder.getItems()) };
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
