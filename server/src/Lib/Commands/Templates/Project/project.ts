import { TemplateBuilder } from "../Builder";
import { context } from "../Context";
import * as path from "path";

import * as World from "../World/index";
import { create_language_files } from "../Language/files";

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_world_project(ID: string, context: context, Builder: TemplateBuilder): void {
  const Folder = path.join(context.WorkSpace(), "world");

  const NewContext: context = {
    WorkSpace: () => context.WorkSpace(),
    BehaviorPack: () => path.join(Folder, "behavior_packs", ID + "-BP"),
    ResourcePack: () => path.join(Folder, "resource_packs", ID + "-RP"),
    WorldFolder: () => Folder,
  };

  //create world manifest
  World.create_manifest_file(NewContext, Builder);
  BehaviorPack.create_manifest_file(NewContext, Builder);
  ResourcePack.create_manifest_file(NewContext, Builder);

  create_language_files(NewContext.BehaviorPack(), Builder);
  create_language_files(NewContext.ResourcePack(), Builder);
  create_language_files(NewContext.WorldFolder(), Builder);
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_behaviorpack(ID: string, context: context, Builder: TemplateBuilder): void {
  const Folder = path.join(context.WorkSpace(), ID + "-BP");

  const NewContext: context = {
    WorkSpace: () => context.WorkSpace(),
    BehaviorPack: () => Folder,
    ResourcePack: () => Folder,
    WorldFolder: context.WorldFolder,
  };

  BehaviorPack.create_manifest_file(NewContext, Builder);
  create_language_files(Folder, Builder);
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_resourcepack(ID: string, context: context, Builder: TemplateBuilder): void {
  const Folder = path.join(context.WorkSpace(), ID + "-RP");

  const NewContext: context = {
    WorkSpace: context.WorkSpace,
    BehaviorPack: () => Folder,
    ResourcePack: () => Folder,
    WorldFolder: context.WorldFolder,
  };

  ResourcePack.create_manifest_file(NewContext, Builder);
  create_language_files(Folder, Builder);
}
