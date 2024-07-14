import { CompletionBuilder } from "../../builder/builder";
import { InsertReplaceEdit, Position, Range } from "vscode-languageserver";
import { GetCurrentString, TextRange } from "../../../Minecraft/Json/Functions";
import { JsonCompletionContext } from "../../builder/context";
import { PackType } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../Code/SimpleContext";
import { EntityEvent } from "../behavior-pack";

import * as BehaviorPack from "../behavior-pack/main";
import * as Mcfunction from "../mcfunctions/mcfunctions";
import * as Molang from "../molang/main";
import * as ResourcePack from "../resource-pack/main";
import { TextDocument } from '../../../Types/Document';

export function provideCompletionDocument(context: SimpleContext<CompletionBuilder>, cursorPos: Position): void {
  const doc = context.doc;
  const cursor = doc.offsetAt(cursorPos);
  const text = doc.getText();
  const range = GetCurrentString(text, cursor);

  //If start has not been found or not a property
  if (range === undefined) return;
  const currentText = text.substring(range.start, range.end);

  const jsonContext: JsonCompletionContext = {
    ...context,
    cursor,
    range,
    currentText,
    receiver: builder(cursor, range, currentText, doc, context.receiver),
  };

  //Have each new item pass through a new function
  performJsonCompletion(jsonContext);
}

function builder(cursor: number, range: TextRange, currentText: string, doc: TextDocument, receiver: CompletionBuilder): CompletionBuilder {
  const insertIndex = cursor - range.start;
  const first = currentText.substring(0, insertIndex);
  const second = currentText.substring(insertIndex);
  const position = doc.positionAt(cursor);

  return receiver.withEvents((item) => {
    //Update the filtering text
    let old = item.insertText ?? item.label;

    let text = old;
    if (first !== "") old = old.replace(first, "");
    if (second !== "") old = old.replace(second, "");

    if (first !== "" && !text.startsWith(first)) text = first + text;
    if (second !== "" && !text.endsWith(second)) text = text + second;

    item.filterText = text;
    if (!item.filterText.endsWith('"')) item.filterText = item.filterText + '"';
    if (!item.filterText.startsWith('"')) item.filterText = '"' + item.filterText;

    item.textEdit = InsertReplaceEdit.create(
      item.insertText ?? item.label,
      Range.create(position, position),
      Range.create(position, position)
    );

    if (item.insertText) item.insertText = undefined;
  });
}

function performJsonCompletion(context: JsonCompletionContext) {
  const type = PackType.detect(context.doc.uri);
  if (type == PackType.unknown) {
    return;
  }

  onCompletionJsonMolang(context);

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
