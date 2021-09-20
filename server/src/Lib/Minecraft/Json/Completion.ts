import { PackType } from "bc-minecraft-bedrock-project";
import { CompletionItem, InsertReplaceEdit, Position, Range } from "vscode-languageserver";
import { SimpleContext } from "../../Code/SimpleContext";
import { BehaviorPack, Mcfunction, Molang, ResourcePack } from "../include";
import { GetCurrentString } from "../../Types/Document/Json Functions";
import { CompletionBuilder } from "../../Completion/Builder";

export function ProvideCompletionDocument(context: SimpleContext<CompletionBuilder>, cursorPos: Position): void {
  const type = PackType.detect(context.doc.uri);

  if (type == PackType.unknown) return;

  const cursor = context.doc.offsetAt(cursorPos);
  OnCompletionJsonMolang(context, cursor);

  switch (type) {
    case PackType.resource_pack:
      return ResourcePack.ProvideCompletion(context);

    default:
      break;
  }
}

function OnCompletionJsonMolang(context: SimpleContext<CompletionBuilder>, cursor: number) {
  const doc = context.doc;
  const receiver = context.receiver;
  const text = doc.getText();
  const range = GetCurrentString(text, cursor);

  //If start has not been found or not a property
  if (range == undefined) return;

  //Prepare data to be fixed for json
  const data = text.substring(range.start, range.end);
  const insertIndex = cursor - range.start;
  const first = '"' + data.substring(0, insertIndex);
  const second = data.substring(insertIndex) + '"';
  const P = doc.positionAt(cursor);
  const R = Range.create(P, P);

  //Have each new item pass through a new function
  var Function = receiver.OnNewItem;
  receiver.OnNewItem = (NewItem: CompletionItem) => {
    //Update the filtering text
    NewItem.filterText = first + NewItem.label + second;
    NewItem.textEdit = InsertReplaceEdit.create(NewItem.label, R, R);

    if (Function) Function(NewItem);
  };

  //Find all events
  if (data.startsWith("@s")) {
    BehaviorPack.EntityEvent.ProvideCompletion(context);
    //Is it a command instead
  } else if (data.startsWith("/")) {
    Mcfunction.ProvideCompletionLine(context, data.substring(1), cursor, range.start + 1);
    //Its probally molang
  } else {
    Molang.ProvideCompletion(data, cursor - range.start, { doc: doc, receiver: receiver });
  }

  receiver.OnNewItem = Function;
}
