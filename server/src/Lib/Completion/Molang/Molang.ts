import { PackType, ResourcePack } from "bc-minecraft-bedrock-project";
import { Model } from "bc-minecraft-bedrock-project/lib/src/Lib/Internal/ResourcePack/Model";
import { Documentated, Identifiable, Locatable } from "bc-minecraft-bedrock-types/lib/src/Types/include";
import { CompletionItemKind } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { Languages } from "../../Constants";
import { Database } from "../../Database/include";
import { Molang } from "../../include";
import { Manager } from "../../Manager/Manager";
import { Kinds } from "../../Minecraft/General/include";
import { GetPreviousWord } from "../../Molang/include";
import { IsEducationEnabled } from "../../Project/include";
import { TextDocument } from "../../Types/Document/TextDocument";
import { CompletionBuilder, IDataSet } from "../Builder";
import { OnCompletionMolangVariable } from "./Variables";

export function OnCompletionEntityEvents(receiver: CompletionBuilder): void {
  Database.ProjectData.BehaviorPacks.entities.forEach((x) => {
    x.events.forEach((event) => {
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
  const Edu = IsEducationEnabled(doc);

  switch (Word.toLowerCase()) {
    case "animation":
      return AnimationsCompletion(receiver, doc);

    case "controller":
      return ControllersCompletion(receiver, doc);

    case "q":
    case "query":
      //TODO redo

      //Convert(Manager.Data.Vanilla.Molang.Query, receiver);
      //if (Edu) Convert(Manager.Data.Edu.Molang.Query, receiver);
      return;

    case "m":
    case "math":
      //TODO redo

      //Convert(Manager.Data.Vanilla.Molang.Math, receiver);
      //if (Edu) Convert(Manager.Data.Edu.Molang.Math, receiver);
      return;

    case "geometry":
      CreateGeometries(Database.ProjectData.ResourcePacks.models, receiver);
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

    //TODO redo
    //ConvertPrefixed(Manager.Data.Vanilla.Molang.Query, receiver, "query.");
    //ConvertPrefixed(Manager.Data.Vanilla.Molang.Math, receiver, "math.");

    if (Edu) {
      //TODO redo
      //ConvertPrefixed(Manager.Data.Edu.Molang.Query, receiver, "query.");
      //ConvertPrefixed(Manager.Data.Edu.Molang.Math, receiver, "math.");
    }
  }
}

function CreateGeometries(Models: IDataSet<ResourcePack.Model.Model>, receiver: CompletionBuilder): void {
  Models.forEach((model) => {
    let data = model.id;
    let index = data.indexOf(".");

    if (index > -1) data = data.substring(index + 1);

    receiver.Add(data, "The geometry of: " + model.id, CompletionItemKind.Property);
  });
}

//TODO redo
/*
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
}*/

function AnimationsCompletion(receiver: CompletionBuilder, doc: TextDocument): void {
  const type = PackType.detect(doc.uri);

  switch (type) {
    case PackType.behavior_pack:
      return AddFromDataCollector(Database.ProjectData.BehaviorPacks.animations, receiver, "BP animation");

    case PackType.resource_pack:
      return AddFromDataCollector(Database.ProjectData.ResourcePacks.animations, receiver, "RP animation");
  }
}

function ControllersCompletion(receiver: CompletionBuilder, doc: TextDocument): void {
  const type = PackType.detect(doc.uri);

  switch (type) {
    case PackType.behavior_pack:
      return AddFromDataCollector(Database.ProjectData.BehaviorPacks.animation_controllers, receiver, "BP animation controller");

    case PackType.resource_pack:
      AddFromDataCollector(Database.ProjectData.ResourcePacks.animation_controllers, receiver, "RP animation controller");

      if (doc.uri.includes("render_controllers")) AddFromDataCollector(Database.ProjectData.ResourcePacks.render_controllers, receiver, "render controller");
      return;
  }
}

function AddFromDataCollector<T extends Identifiable & Locatable>(collection: IDataSet<T>, receiver: CompletionBuilder, type: string) {
  collection.forEach((item) => {
    const id = IDRemoveFirst(item.id);

    const documentation = (Documentated.is(item) ? item.documentation : undefined) ?? `The ${type}: ${item.id}, from: ${item.location.uri}`;

    receiver.Add(id, documentation, CompletionItemKind.Method);
  });
}

function IDRemoveFirst(id: string): string {
  const index = id.indexOf(".");

  if (index > -1) return id.substring(index + 1);

  return id;
}
