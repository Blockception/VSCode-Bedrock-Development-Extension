import { TextDocument } from "vscode-languageserver-textdocument";
import { GetFilename } from "../../../Code/File";
import { GetDocuments } from "../../../Code/include";
import { Console } from "../../../Console/Console";
import { Code } from "../../../include";
import { DataType } from "../Format/Data Type";
import { DetectDataType } from "../Format/Detection";
import { Resource } from "../include";

export function Process(doc: TextDocument): void {
  let Type = DetectDataType(doc.uri);

  if (Type === DataType.unknown) {
    return;
  }

  Console.Log("    Processing resource pack file: " + GetFilename(doc.uri));

  switch (Type) {
    case DataType.resource_animation:
      return Resource.Animations.Process(doc);

    case DataType.resource_animation_controller:
      return Resource.Animation_Controllers.Process(doc);

    case DataType.resource_entity_model:
      return Resource.Models.Entity.Process(doc);

    case DataType.resource_particle:
      return Resource.Particle.Process(doc);

    case DataType.resource_render_controller:
      return Resource.Render_Controllers.Process(doc);

    case DataType.resource_sounds_definitions:
      return Resource.Sounds_Definitions.Process(doc);
  }
}

export function ProcessResourcePack(Folder: string): void {
  Console.Log("Processing resource pack: " + Folder);

  Code.ForEachDocument(GetDocuments(Folder, "**/*.json"), Process);
}
