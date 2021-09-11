import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants";
import { CompletionItemKind, TextEdit } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { Languages } from "../../Constants";
import { Database, DataCollector } from "../../Database/include";
import { DataReference } from "../../Database/Types/include";
import { Molang } from "../../include";
import { Manager } from "../../Manager/Manager";
import { GetPreviousWord, MolangFunctionDataItem } from "../../Molang/include";
import { TextDocument } from "../../Types/Document/TextDocument";
import { Kinds } from "../../Types/General/include";
import { DetectGeneralDataType } from "../../Types/Minecraft/Format/Detection";
import { GeneralDataType } from "../../Types/Minecraft/Format/General Data Type";
import { Documentable } from "../../Types/Minecraft/Interfaces/Documentable";
import { Identifiable } from "../../Types/Minecraft/Interfaces/Identifiable";
import { Locatable } from "../../Types/Minecraft/Interfaces/Locatable";
import { CompletionBuilder } from "../Builder";
import { OnCompletionMolangVariable } from "./Variables";

export function OnCompletionEntityEvents(receiver: CompletionBuilder): void {
  Database.ProjectData.General.Entities.ForEach((x) => {
    x.Events.forEach((event) => {
      receiver.Add(event, `The ${x.id} event: ${event}`, Kinds.Completion.Event);
    });
  });
}

/**
 *
 * @param doc
 * @param pos
 * @param receiver
 * @returns
 */
export function OnCompletionMolangRequest(doc: TextDocument, pos: Position, receiver: CompletionBuilder) {
  const line = doc.getLine(pos.line);
  return OnCompletionMolang(line, pos.character, doc, receiver);
}

/**
 *
 * @param line
 * @param cursor
 * @param doc
 * @param receiver
 * @returns
 */
export function OnCompletionMolang(line: string, cursor: number, doc: TextDocument, receiver: CompletionBuilder): void {
  const Word = GetPreviousWord(line, cursor);
  const Edu = doc.getConfiguration().settings.Education.Enable;

  switch (Word.toLowerCase()) {
    case "animation":
      return AnimationsCompletion(receiver, doc);

    case "controller":
      return ControllersCompletion(receiver, doc);

    case "q":
    case "query":
      Convert(Manager.Data.Vanilla.Molang.Query, receiver);
      if (Edu) Convert(Manager.Data.Edu.Molang.Query, receiver);
      return;

    case "m":
    case "math":
      Convert(Manager.Data.Vanilla.Molang.Math, receiver);
      if (Edu) Convert(Manager.Data.Edu.Molang.Math, receiver);
      return;

    case "geometry":
      CreateGeometries(Database.ProjectData.Resourcepack.Models, receiver);
      return;

    case "v":
    case "variable":
      return OnCompletionMolangVariable(doc, receiver);

    case "t":
    case "texture":
    case "temp":
      break;
  }

  if (Molang.IsMolang(line) || doc.languageId == Languages.McMolangIdentifier) {
    receiver.Add("query", "", CompletionItemKind.Class);
    receiver.Add("variable", "", CompletionItemKind.Variable);
    receiver.Add("math", "", CompletionItemKind.Class);
    receiver.Add("texture", "", CompletionItemKind.Property);
    receiver.Add("geometry", "", CompletionItemKind.Property);
    receiver.Add("temp", "", CompletionItemKind.Variable);
    receiver.Add("this", "", CompletionItemKind.Struct);

    ConvertPrefixed(Manager.Data.Vanilla.Molang.Query, receiver, "query.");
    ConvertPrefixed(Manager.Data.Vanilla.Molang.Math, receiver, "math.");

    if (Edu) {
      ConvertPrefixed(Manager.Data.Edu.Molang.Query, receiver, "query.");
      ConvertPrefixed(Manager.Data.Edu.Molang.Math, receiver, "math.");
    }
  }
}

function CreateGeometries(Models: DataCollector<DataReference>, receiver: CompletionBuilder): void {
  Models.ForEach((model) => {
    let data = model.id;
    let index = data.indexOf(".");

    if (index > -1) data = data.substring(index + 1);

    receiver.Add(data, "The geometry of: " + model.id, CompletionItemKind.Property);
  });
}

function Convert(data: MolangFunctionDataItem[], receiver: CompletionBuilder): void {
  for (let I = 0; I < data.length; I++) {
    const Item = data[I];

    receiver.Add(Item.function, Item.documentation, CompletionItemKind.Function);
  }
}

function ConvertPrefixed(data: MolangFunctionDataItem[], receiver: CompletionBuilder, prefix: string): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.Add(prefix + Item.function, Item.documentation, CompletionItemKind.Function);
  }
}

function AnimationsCompletion(receiver: CompletionBuilder, doc: TextDocument): void {
  const type = DetectGeneralDataType(doc.uri);

  switch (type) {
    case GeneralDataType.behavior_pack:
      return AddFromDataCollector(Database.Data.Behaviorpack.Animations, receiver, "BP animation");

    case GeneralDataType.resource_pack:
      return AddFromDataCollector(Database.Data.Resourcepack.Animations, receiver, "RP animation");
  }
}

function ControllersCompletion(receiver: CompletionBuilder, doc: TextDocument): void {
  const type = DetectGeneralDataType(doc.uri);

  switch (type) {
    case GeneralDataType.behavior_pack:
      return AddFromDataCollector(Database.Data.Behaviorpack.AnimationControllers, receiver, "BP animation controller");

    case GeneralDataType.resource_pack:
      AddFromDataCollector(Database.Data.Resourcepack.AnimationControllers, receiver, "RP animation controller");

      if (doc.uri.includes("render_controllers")) AddFromDataCollector(Database.Data.Resourcepack.RenderControllers, receiver, "render controller");
      return;
  }
}

function AddFromDataCollector<T extends Identifiable & Locatable>(collection: DataCollector<T>, receiver: CompletionBuilder, type: string) {
  collection.ForEach((item) => {
    const id = IDRemoveFirst(item.id);

    const documentation = Documentable.is(item) ? item.Documentation.value : `The ${type}: ${item.id}, from: ${item.Location}`;

    receiver.Add(id, documentation, CompletionItemKind.Method);
  });
}

function IDRemoveFirst(id: string): string {
  const index = id.indexOf(".");

  if (index > -1) return id.substring(index + 1);

  return id;
}
