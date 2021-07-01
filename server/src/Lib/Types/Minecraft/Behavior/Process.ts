import { UniformFolder } from "../../../Code/Url";
import { Console } from "../../../Console/Console";
import { ForEachDocument, GetDocuments } from "../../Document/include";
import { TextDocument } from "../../Document/TextDocument";
import { DataType } from "../Format/Data Type";
import { DetectDataType } from "../Format/Detection";
import * as behavior from "./include";

export function Process(doc: TextDocument): void {
  let Type = DetectDataType(doc.uri);
  if (Type === DataType.unknown) return;

  //Console.Log("    Processing behavior pack file: " + GetFilename(doc.uri));
  ValidateFolder(doc);

  switch (Type) {
    case DataType.behavior_animation:
      return behavior.Animations.Process(doc);

    case DataType.behavior_animation_controller:
      return behavior.Animation_Controllers.Process(doc);

    case DataType.behavior_block:
      return behavior.Blocks.Process(doc);

    case DataType.behavior_entity:
      return behavior.Entities.Process(doc);

    case DataType.behavior_function:
      return behavior.Functions.Process(doc);

    case DataType.behavior_item:
      return behavior.Items.Process(doc);

    case DataType.behavior_loot_table:
      return behavior.Loot_Table.Process(doc);
  }
}

/**
 * Process the given folder as if it was a behavior pack
 * @param Folder
 */
export function ProcessBehaviorPack(Folder: string): void {
  Console.Log("Processing behavior pack: " + UniformFolder(Folder));

  ForEachDocument(GetDocuments(Folder, ["**/*.json", "**/*.mcfunction"]), Process);
}

export function ValidateFolder(doc: TextDocument): void {
  const uri = doc.uri;
}
