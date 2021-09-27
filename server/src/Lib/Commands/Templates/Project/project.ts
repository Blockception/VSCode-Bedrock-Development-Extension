import { Templates } from "../../include";
import { TemplateBuilder } from "../Builder";
import { context } from "../Context";
import * as path from "path";

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_world_project(ID: string, context: context, Builder: TemplateBuilder): void {
  const Folder = path.join(context.WorkFolder, "world");

  const NewContext: context = {
    WorkFolder: context.WorkFolder,
    BehaviorPack: path.join(Folder, "behavior_packs", ID + "-BP"),
    ResourcePack: path.join(Folder, "resource_packs", ID + "-RP"),
    WorldFolder: Folder,
  };

  //create world manifest
  Templates.World.create_manifest_file(NewContext, Builder);
  Templates.Behavior_Pack.create_manifest_file(NewContext, Builder);
  Templates.Resource_Pack.create_manifest_file(NewContext, Builder);
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_behaviorpack(ID: string, context: context, Builder: TemplateBuilder): void {
  const Folder = path.join(context.WorkFolder, ID + "-BP");

  const NewContext: context = {
    WorkFolder: context.WorkFolder,
    BehaviorPack: Folder,
    ResourcePack: Folder,
    WorldFolder: context.WorldFolder,
  };

  Templates.Behavior_Pack.create_manifest_file(NewContext, Builder);
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_resourcepack(ID: string, context: context, Builder: TemplateBuilder): void {
  const Folder = path.join(context.WorkFolder, ID + "-RP");

  const NewContext: context = {
    WorkFolder: context.WorkFolder,
    BehaviorPack: Folder,
    ResourcePack: Folder,
    WorldFolder: context.WorldFolder,
  };

  Templates.Resource_Pack.create_manifest_file(NewContext, Builder);
}
