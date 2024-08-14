import { PackType } from "bc-minecraft-bedrock-project";
import { InsertReplaceEdit, Range } from "vscode-languageserver";
import { getCurrentStringValue, TextRange } from "../../../../minecraft/json/functions";
import { getJsonPath } from "../../../../minecraft/json/path";
import { santizeValue } from "../../../../minecraft/json/types";
import { Context } from "../../../context/context";
import { TextDocument } from "../../../documents";
import { CompletionBuilder } from "../../builder/builder";
import { CompletionContext, JsonCompletionContext } from "../../context";
import { EntityEvent } from "../behavior-pack";

import * as BehaviorPack from "../behavior-pack/main";
import * as Mcfunction from "../mcfunctions/mcfunctions";
import * as Molang from "../molang/main";
import * as ResourcePack from "../resource-pack/main";

export function provideCompletionDocument(context: Context<CompletionContext>): void {
  const { document, cursor } = context;
  const text = document.getText();

  const p = getJsonPath(context.cursor, text);
  if (!p.isProperty) {
    return;
  }

  //If start has not been found or not a property
  const range = getCurrentStringValue(text, p.property, cursor) ?? { start: cursor, end: cursor };
  const currentText = text.substring(range.start, range.end);
  const jsonContext: Context<JsonCompletionContext> = Context.modify(context, {
    range,
    currentText,
  });

  //Have each new item pass through a new function
  performJsonCompletion(jsonContext);
}

function jsonBuilder(
  cursor: number,
  range: TextRange,
  currentText: string,
  document: TextDocument,
  builder: CompletionBuilder
): CompletionBuilder {
  const insertIndex = cursor - range.start;
  const first = currentText.substring(0, insertIndex);
  const second = currentText.substring(insertIndex);
  const position = document.positionAt(cursor);

  return builder.withEvents(undefined, (item) => {
    //Update the filtering text
    let filterText = item.insertText ?? item.label;

    if (currentText === "") {
      item.filterText = filterText;
      return;
    }

    if (first !== "" && !filterText.startsWith(first)) filterText = first + filterText;
    if (second !== "" && !filterText.endsWith(second)) filterText = filterText + second;

    // Filter text is provided for completion order
    if (!filterText.endsWith('"')) filterText = filterText + '"';
    if (!filterText.startsWith('"')) filterText = '"' + filterText;
    item.filterText = filterText;

    item.textEdit = InsertReplaceEdit.create(
      item.insertText ?? item.label,
      Range.create(position, position),
      Range.create(position, position)
    );

    if (item.insertText) item.insertText = undefined;
  });
}

function performJsonCompletion(context: Context<JsonCompletionContext>) {
  if (!context.settings?.Completion?.JSON) return;

  const type = PackType.detect(context.document.uri);
  if (type == PackType.unknown) {
    return;
  }

  onCompletionJsonMolang(context);

  context = Context.modify(context, {
    builder: context.builder.withEvents((item) => {
      item.insertText = item.insertText ?? item.label;
      item.insertText = santizeValue(item.insertText);
    }),
  });

  switch (type) {
    case PackType.behavior_pack:
      return BehaviorPack.provideJsonCompletion(context);

    case PackType.resource_pack:
      return ResourcePack.provideJsonCompletion(context);
  }
}

function onCompletionJsonMolang(context: Context<JsonCompletionContext>) {
  //Find all events
  if (context.currentText.startsWith("@s")) {
    EntityEvent.provideCompletion(context);
    //Is it a command instead
  } else if (context.currentText.startsWith("/")) {
    Mcfunction.provideCompletionLine(context, context.currentText.substring(1), context.cursor);
    //Its probably molang
  } else {
    Molang.provideCompletion(context, context.currentText, context.cursor - context.range.start);
  }
}
