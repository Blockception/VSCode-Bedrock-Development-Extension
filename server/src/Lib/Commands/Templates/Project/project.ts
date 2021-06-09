import { Templates } from "../../include";
import { TemplateBuilder } from "../Builder";
import { Context } from "../Context";
import * as path from "path";

/**
 *
 * @param ID
 * @param Context
 * @param Builder
 */
export function create_world_project(ID: string, Context: Context, Builder: TemplateBuilder): void {
  const Folder = path.join(Context.WorkFolder, "world");

  const NewContext: Context = {
    WorkFolder: Context.WorkFolder,
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
 * @param Context
 * @param Builder
 */
export function create_behaviorpack(ID: string, Context: Context, Builder: TemplateBuilder): void {
  const Folder = path.join(Context.WorkFolder, ID + "-BP");

  const NewContext: Context = {
    WorkFolder: Context.WorkFolder,
    BehaviorPack: Folder,
    ResourcePack: Folder,
    WorldFolder: Context.WorldFolder,
  };

  Templates.Behavior_Pack.create_manifest_file(NewContext, Builder);
}

/**
 *
 * @param ID
 * @param Context
 * @param Builder
 */
export function create_resourcepack(ID: string, Context: Context, Builder: TemplateBuilder): void {
  const Folder = path.join(Context.WorkFolder, ID + "-RP");

  const NewContext: Context = {
    WorkFolder: Context.WorkFolder,
    BehaviorPack: Folder,
    ResourcePack: Folder,
    WorldFolder: Context.WorldFolder,
  };

  Templates.Resource_Pack.create_manifest_file(NewContext, Builder);
}
