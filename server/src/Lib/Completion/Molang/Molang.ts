import { CompletionItemKind } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Database, DataCollector } from "../../Database/include";
import { DataReference } from "../../Database/Types/include";
import { Molang } from "../../include";
import { Manager } from "../../Manager/Manager";
import { GetPreviousWord, MolangFunctionDataItem } from "../../Molang/include";
import { Kinds } from "../../Types/General/include";
import { CompletionBuilder } from "../Builder";
import { OnCompletionMolangVariable } from "./Variables";

export function OnCompletionEntityEvents(receiver: CompletionBuilder): void {
  Database.Data.General.Entities.ForEach((x) => {
    x.Events.forEach((event) => {
      receiver.Add(event, `The ${x.Identifier} event: ${event}`, Kinds.Completion.Event);
    });
  });
}

export function OnCompletionMolang(line: string, cursor: number, doc: TextDocument, receiver: CompletionBuilder): void {
  let Word = GetPreviousWord(line, cursor);

  switch (Word.toLowerCase()) {
    case "q":
    case "query":
      return Convert(Manager.Data.Molang.Query, receiver);

    case "m":
    case "math":
      return Convert(Manager.Data.Molang.Math, receiver);

    case "geometry":
      return CreateGeometries(Database.Data.Resourcepack.Models, receiver);

    case "v":
    case "variable":
      return OnCompletionMolangVariable(doc, receiver);

    case "t":
    case "texture":
    case "temp":
  }

  if (Molang.IsMolang(line)) {
    receiver.Add("query", "", CompletionItemKind.Class);
    receiver.Add("variable", "", CompletionItemKind.Variable);
    receiver.Add("math", "", CompletionItemKind.Class);
    receiver.Add("texture", "", CompletionItemKind.Property);
    receiver.Add("geometry", "", CompletionItemKind.Property);
    receiver.Add("temp", "", CompletionItemKind.Variable);
    receiver.Add("this", "", CompletionItemKind.Struct);

    ConvertPrefixed(Manager.Data.Molang.Query, receiver, "query.");
    ConvertPrefixed(Manager.Data.Molang.Math, receiver, "math.");
  }
}

function CreateGeometries(Models: DataCollector<DataReference>, receiver: CompletionBuilder): void {
  Models.ForEach((model) => {
    let data = model.Identifier;
    let index = data.indexOf(".");

    if (index > -1) data = data.substring(index + 1);

    receiver.Add(data, "The geometry of: " + model.Identifier, CompletionItemKind.Property);
  });
}

function Convert(data: MolangFunctionDataItem[], receiver: CompletionBuilder): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.Add(Item.function, Item.documentation, CompletionItemKind.Function);
  }
}

function ConvertPrefixed(data: MolangFunctionDataItem[], receiver: CompletionBuilder, prefix: string): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.Add(prefix + Item.function, Item.documentation, CompletionItemKind.Function);
  }
}
