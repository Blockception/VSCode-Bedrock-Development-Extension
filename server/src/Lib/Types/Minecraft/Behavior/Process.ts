import { GetDocuments } from "../../../Code/include";
import { Console } from "../../../Console/Console";
import { Code } from "../../../include";
import { TextDocument } from "../../Document/TextDocument";
import { DataType } from "../Format/Data Type";
import { DetectDataType } from "../Format/Detection";
import * as behaviour from "./include";

export function Process(doc: TextDocument): void {
  let Type = DetectDataType(doc.uri);
  if (Type === DataType.unknown) return;

  //Console.Log("    Processing behavior pack file: " + GetFilename(doc.uri));
  ValidateFolder(doc);

  switch (Type) {
    case DataType.behaviour_animation:
      return behaviour.Animations.Process(doc);

    case DataType.behaviour_animation_controller:
      return behaviour.Animation_Controllers.Process(doc);

    case DataType.behaviour_block:
      return behaviour.Blocks.Process(doc);

    case DataType.behaviour_entity:
      return behaviour.Entities.Process(doc);

    case DataType.behaviour_function:
      return behaviour.Functions.Process(doc);

    case DataType.behaviour_item:
      return behaviour.Items.Process(doc);

    case DataType.behaviour_loot_table:
      return behaviour.Loot_Table.Process(doc);
  }
}

/**
 * Process the given folder as if it was a behaviour pack
 * @param Folder
 */
export function ProcessBehaviourPack(Folder: string): void {
  Console.Log("Processing behaviour pack: " + Folder);
  Code.ForEachDocument(GetDocuments(Folder, ["**/*.json", "**/*.mcfunction"]), Process);
}

export function ValidateFolder(doc: TextDocument): void {
  const uri = doc.uri;
}
