import { CompletionItem, InsertReplaceEdit, Range } from "vscode-languageserver";
import { GetCurrentString } from "../Types/Document/Json Functions";
import { TextDocument } from "../Types/Document/TextDocument";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { CompletionBuilder } from "./Builder";
import { OnCompletionMcFunctionLine } from "./Mcfunction";
import { OnCompletionEntityEvents, OnCompletionMolang } from "./Molang/Molang";

export function OnCompletionJson(doc: TextDocument, cursor: number, receiver: CompletionBuilder): void {
  let type = DetectGeneralDataType(doc.uri);

  if (type == GeneralDataType.unknown) return;

  let text = doc.getText();
  let range = GetCurrentString(text, cursor);

  //If start has not been found or not a property
  if (range == undefined) return;

  let data = text.substring(range.start, range.end);
  let insertIndex = cursor - range.start;
  let first = '"' + data.substring(0, insertIndex);
  let second = data.substring(insertIndex) + '"';
  let P = doc.positionAt(cursor);
  let R = Range.create(P, P);

  //Have each new item pass through a new function
  receiver.OnNewItem = (NewItem: CompletionItem) => {
    //Update the filtering text
    NewItem.filterText = first + NewItem.label + second;
    NewItem.textEdit = InsertReplaceEdit.create(NewItem.label, R, R);
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

  receiver.OnNewItem = undefined;
}
