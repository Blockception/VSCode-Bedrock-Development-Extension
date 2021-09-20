import { PackType } from "bc-minecraft-bedrock-project";
import { CompletionItem, InsertReplaceEdit, Range } from "vscode-languageserver";
import { ResourcePack } from "../Minecraft/include";
import { GetCurrentString } from "../Types/Document/Json Functions";
import { TextDocument } from "../Types/Document/TextDocument";
import { CompletionBuilder } from "./Builder";
import { Molang } from "./include";
import { OnCompletionMcFunctionLine } from "./Mcfunction";

export function OnCompletionJson(doc: TextDocument, cursor: number, receiver: CompletionBuilder): void {
  const type = PackType.detect(doc.uri);

  if (type == PackType.unknown) return;

  OnCompletionJsonMolang(doc, cursor, receiver);

  switch (type) {
    case PackType.resource_pack:
      return ResourcePack.ProvideCompletion(doc, receiver);

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
    Molang.OnCompletionEntityEvents(receiver);
  } else if (data.startsWith("/")) {
    let temp = data.substring(1);
    OnCompletionMcFunctionLine(temp, cursor, range.start + 1, doc, receiver);
  } else {
    Molang;
    OnCompletionMolang(data, cursor - range.start, doc, receiver);
  }

  receiver.OnNewItem = Function;
}
