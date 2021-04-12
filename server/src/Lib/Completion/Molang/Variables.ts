import { CompletionItemKind } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Manager } from "../../Manager/Manager";
import { MolangFunctionDataItem } from "../../Molang/include";
import { DataType, DetectDataType } from "../../Types/Minecraft/Format/include";
import { CompletionBuilder } from "../Builder";

export function OnCompletionMolangVariable(doc: TextDocument, receiver: CompletionBuilder): void {
  let Type = DetectDataType(doc.uri);

  switch (Type) {
    case DataType.resource_particle:
      return Convert(Manager.Data.Molang.Particles.variable, receiver);

    case DataType.behaviour_animation:
    case DataType.behaviour_animation_controller:
    case DataType.behaviour_entity:
    case DataType.resource_animation:
    case DataType.resource_animation_controller:
    case DataType.resource_entity:
      return Convert(Manager.Data.Molang.Entities.variable, receiver);
  }
}

function Convert(data: MolangFunctionDataItem[], receiver: CompletionBuilder): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.Add(Item.function, Item.documentation, CompletionItemKind.Variable);
  }
}
