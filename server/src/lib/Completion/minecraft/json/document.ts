import { CompletionBuilder } from "../../builder/builder";
import { InsertReplaceEdit, Position, Range } from "vscode-languageserver";
import { GetCurrentString } from "../../../Minecraft/Json/Functions";
import { JsonCompletionContext } from "../../builder/context";
import { PackType } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../Code/SimpleContext";
import { EntityEvent } from '../behavior-pack';

import * as BehaviorPack from "../../minecraft/behavior-pack/main";
import * as Mcfunction from "../../minecraft/mcfunctions/mcfunctions";
import * as Molang from "../molang/main";
import * as ResourcePack from "../../minecraft/resource-pack/main";

export function provideCompletionDocument(context: SimpleContext<CompletionBuilder>, cursorPos: Position): void {
  const c = context as JsonCompletionContext;
  c.cursor = context.doc.offsetAt(cursorPos);

  const text = c.doc.getText();
  const range = GetCurrentString(text, c.cursor);

  //If start has not been found or not a property
  if (range == undefined) return;
  c.range = range;

  //Prepare data to be fixed for json
  c.currentText = text.substring(c.range.start, c.range.end);

  const insertIndex = c.cursor - range.start;
  const first = c.currentText.substring(0, insertIndex);
  const second = c.currentText.substring(insertIndex);
  const P = c.doc.positionAt(c.cursor);
  const R = Range.create(P, P);

  //Have each new item pass through a new function
  const cancelFn = c.receiver.OnNewItem((item, next) => {
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

    item.textEdit = InsertReplaceEdit.create(item.insertText ?? item.label, R, R);

    if (item.insertText) item.insertText = undefined;

    next(item);
  });

  performJsonCompletion(c);

  //Restore old function
  cancelFn();
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
