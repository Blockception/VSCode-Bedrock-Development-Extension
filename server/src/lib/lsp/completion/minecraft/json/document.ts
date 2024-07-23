import { CompletionBuilder } from "../../builder/builder";
import { EntityEvent } from "../behavior-pack";
import { getCurrentStringValue, TextRange } from "../../../../minecraft/json/functions";
import { getJsonPath } from "../../../../minecraft/json/path";
import { InsertReplaceEdit, Position, Range } from "vscode-languageserver";
import { JsonCompletionContext } from "../../builder/context";
import { Manager } from "../../../../manager/manager";
import { PackType } from "bc-minecraft-bedrock-project";
import { santizeValue } from "../../../../minecraft/json/types";
import { SimpleContext } from "../../../../util/simple-context";
import { TextDocument } from "../../../documents";

import * as BehaviorPack from "../behavior-pack/main";
import * as Mcfunction from "../mcfunctions/mcfunctions";
import * as Molang from "../molang/main";
import * as ResourcePack from "../resource-pack/main";

export function provideCompletionDocument(context: SimpleContext<CompletionBuilder>, cursorPos: Position): void {
  const doc = context.doc;
  const cursor = doc.offsetAt(cursorPos);
  const text = doc.getText();

  const p = getJsonPath(context.cursor, text);
  if (!p.isProperty) {
    return;
  }

  //If start has not been found or not a property
  let range = getCurrentStringValue(text, p.property, cursor) ?? { start: cursor, end: cursor };

  const currentText = text.substring(range.start, range.end);
  const jsonContext: JsonCompletionContext = {
    ...context,
    cursor,
    range,
    currentText,
    builder: builder(cursor, range, currentText, doc, context.builder),
  };

  //Have each new item pass through a new function
  performJsonCompletion(jsonContext);
}

function builder(
  cursor: number,
  range: TextRange,
  currentText: string,
  doc: TextDocument,
  receiver: CompletionBuilder
): CompletionBuilder {
  const insertIndex = cursor - range.start;
  const first = currentText.substring(0, insertIndex);
  const second = currentText.substring(insertIndex);
  const position = doc.positionAt(cursor);

  return receiver.withEvents(undefined, (item) => {
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

function performJsonCompletion(context: JsonCompletionContext) {
  if (!Manager.Settings?.Completion?.JSON) return;

  const type = PackType.detect(context.doc.uri);
  if (type == PackType.unknown) {
    return;
  }

  onCompletionJsonMolang(context);

  context = {
    ...context,
    builder: context.builder.withEvents((item) => {
      item.insertText = item.insertText ?? item.label;
      item.insertText = santizeValue(item.insertText);
    }),
  };

  switch (type) {
    case PackType.behavior_pack:
      return BehaviorPack.provideJsonCompletion(context);

    case PackType.resource_pack:
      return ResourcePack.provideJsonCompletion(context);
  }
}

function onCompletionJsonMolang(context: JsonCompletionContext) {
  //Find all events
  if (context.currentText.startsWith("@s")) {
    EntityEvent.provideCompletion(context);
    //Is it a command instead
  } else if (context.currentText.startsWith("/")) {
    Mcfunction.provideCompletionLine(
      context,
      context.currentText.substring(1),
      context.cursor,
      context.range.start + 1
    );
    //Its probably molang
  } else {
    Molang.provideCompletion(context.currentText, context.cursor - context.range.start, context);
  }
}
