import { CompletionItem, InsertReplaceEdit, Range } from "vscode-languageserver";
import { GetCurrentString } from "../Types/Document/Json Functions";
import { TextDocument } from "../Types/Document/TextDocument";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { Resource } from "../Types/Minecraft/include";
import { CompletionBuilder } from "./Builder";
import { OnCompletionMcFunctionLine } from "./Mcfunction";
import { OnCompletionEntityEvents, OnCompletionMolang } from "./Molang/Molang";

export function OnCompletionJson(doc: TextDocument, cursor: number, receiver: CompletionBuilder): void {
  let type = DetectGeneralDataType(doc.uri);

  if (type == GeneralDataType.unknown) return;

  OnCompletionJsonMolang(doc, cursor, receiver);

  switch (type) {
    case GeneralDataType.resource_pack:
      return Resource.ProvideCompletion(doc, cursor, receiver);

    default:
      break;
  }
}

function OnCompletionJsonMolang(doc: TextDocument, cursor: number, receiver: CompletionBuilder) {
  const text = doc.getText();
  const range = GetCurrentString(text, cursor);

  //If start has not been found or not a property
  if (range == undefined) return;

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
    OnCompletionEntityEvents(receiver);
  } else if (data.startsWith("/")) {
    let temp = data.substring(1);
    OnCompletionMcFunctionLine(temp, cursor, range.start + 1, doc, receiver);
  } else {
    OnCompletionMolang(data, cursor - range.start, doc, receiver);
  }

  receiver.OnNewItem = Function;
}
