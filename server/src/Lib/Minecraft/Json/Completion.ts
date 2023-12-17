import { CompletionBuilder } from "../../Completion/Builder";
import { CompletionItem, InsertReplaceEdit, Position, Range } from "vscode-languageserver";
import { GetCurrentString } from "./Functions";
import { JsonCompletionContext } from "../../Completion/Context";
import { PackType } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../Code/SimpleContext";

import * as BehaviorPack from "../BehaviorPack";
import * as Mcfunction from "../Mcfunction";
import * as Molang from "../Molang";
import * as ResourcePack from "../ResourcePack";

export function provideCompletionDocument(context: SimpleContext<CompletionBuilder>, cursorPos: Position): void {
  const c = <JsonCompletionContext>context;
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
  var Function = c.receiver.OnNewItem;
  c.receiver.OnNewItem = (NewItem: CompletionItem) => {
    //Update the filtering text

    let old = NewItem.insertText ?? NewItem.label;
    let text = old;
    if (first !== "") old = old.replace(first, "");
    if (second !== "") old = old.replace(second, "");

    if (first !== "" && !text.startsWith(first)) text = first + text;
    if (second !== "" && !text.endsWith(second)) text = text + second;

    NewItem.filterText = '"' + text + '"';
    NewItem.textEdit = InsertReplaceEdit.create(NewItem.insertText ?? NewItem.label, R, R);

    if (NewItem.insertText) NewItem.insertText = undefined;

    if (Function) Function(NewItem);
  };

  const type = PackType.detect(context.doc.uri);
  if (type == PackType.unknown) return;

  onCompletionJsonMolang(c);

  switch (type) {
    case PackType.behavior_pack:
      return BehaviorPack.provideCompletion(c);

    case PackType.resource_pack:
      return ResourcePack.provideCompletion(c);

    default:
      break;
  }

  //Restore old function
  c.receiver.OnNewItem = Function;
}

function onCompletionJsonMolang(context: JsonCompletionContext) {
  //Find all events
  if (context.currentText.startsWith("@s")) {
    BehaviorPack.EntityEvent.provideCompletion(context);
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
