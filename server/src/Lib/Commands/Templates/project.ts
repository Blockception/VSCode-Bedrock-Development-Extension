import { Context } from "./Context";
import { create_language_files } from "./language";
import { TemplateBuilder } from "./Builder";
import { Templates } from "./Templates";

import * as path from "path";

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export async function create_world_project(ID: string, context: Context, Builder: TemplateBuilder): Promise<void> {
  const Folder = path.join(context.WorkSpace(), "world");

  const NewContext = {
    WorkSpace: () => context.WorkSpace(),
    BehaviorPack: () => path.join(Folder, "behavior_packs", ID + "-BP"),
    ResourcePack: () => path.join(Folder, "resource_packs", ID + "-RP"),
    WorldFolder: () => Folder,
  };

  await Promise.all([
    Templates.create("world-manifest", NewContext.WorldFolder()),
    Templates.create("behavior-manifest", NewContext.BehaviorPack()),
    Templates.create("resource-manifest", NewContext.ResourcePack()),
  ]);

  //create world manifest
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
export async function create_behaviorpack(ID: string, context: Context, Builder: TemplateBuilder): Promise<void> {
  const Folder = path.join(context.WorkSpace(), ID + "-BP");

  const NewContext = {
    WorkSpace: () => context.WorkSpace(),
    BehaviorPack: () => Folder,
    ResourcePack: () => Folder,
    WorldFolder: context.WorldFolder,
  };

  await Templates.create("behavior-manifest", NewContext.BehaviorPack());
  create_language_files(Folder, Builder);
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export async function create_resourcepack(ID: string, context: Context, Builder: TemplateBuilder): Promise<void> {
  const Folder = path.join(context.WorkSpace(), ID + "-RP");

  const NewContext = {
    WorkSpace: context.WorkSpace,
    BehaviorPack: () => Folder,
    ResourcePack: () => Folder,
    WorldFolder: context.WorldFolder,
  };

  await Templates.create("resource-manifest", NewContext.ResourcePack());
  create_language_files(Folder, Builder);
}
