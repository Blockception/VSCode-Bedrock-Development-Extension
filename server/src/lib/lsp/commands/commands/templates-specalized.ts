import { Commands } from "@blockception/shared";
import { Pack } from "bc-minecraft-bedrock-project";
import { Context } from "../../context/context";
import { IExtensionContext } from "../../extension";
import { TemplateBuilder } from "../../templates/builder";
import { EnsureFolders, Folders, getFolders } from "../../templates/folders";
import { CommandContext } from "../context";
import { CommandManager } from "../manager";
import { createCommand, mustExecute } from "./functions";

import * as Language from "../../templates/language";
import * as Project from "./project";

export function setupCreate(manager: CommandManager) {
  //General
  manager.add(Commands.Create.General.Languages, (context) => createAll(context, Language.create_language_files));
  manager.add(
    Commands.Create.General.Entity,
    createCommand((context: Context<CommandContext>, folders: EnsureFolders) => {
      const ensured = folders.Ensure();

      return Promise.all([
        mustExecute(Commands.Create.Behaviorpack.Entity, context, ensured.BehaviorPack()),
        mustExecute(Commands.Create.Resourcepack.Entity, context, ensured.ResourcePack()),
      ]).then(() => {});
    })
  );
  manager.add(
    Commands.Create.General.Manifests,
    createCommand((context: Context<CommandContext>, folders: EnsureFolders) => {
      const ensured = folders.Ensure();

      return Promise.all([
        mustExecute(Commands.Create.Behaviorpack.Manifests, context, ensured.BehaviorPack()),
        mustExecute(Commands.Create.Resourcepack.Manifests, context, ensured.ResourcePack()),
        mustExecute(Commands.Create.World.Manifests, context, ensured.WorldFolder()),
      ]).then(() => {});
    })
  );

  //Project
  manager.add(Commands.Create.Project.WorldProject, (params) => FunctionWithID(params, Project.create_world_project));
  manager.add(Commands.Create.Project.Resourcepack, (params) => FunctionWithID(params, Project.create_resourcepack));
  manager.add(Commands.Create.Project.Behaviorpack, (params) => FunctionWithID(params, Project.create_behaviorpack));
}

/**
 *
 * @param context
 * @param callback
 */
async function FunctionWithID(
  context: Context<CommandContext>,
  callback: (context: Context<CommandContext>, id: string, folders: Folders, builder: TemplateBuilder) => void
): Promise<void> {
  const folders = getFolders(context);
  const ids = context.arguments;
  if (!ids) return;
  if (!folders) return;

  const builder = new TemplateBuilder(context);

  //Last is reserved for the document
  for (let I = 0; I < ids.length - 1; I++) {
    callback(context, ids[I], folders, builder);
  }

  return builder.send();
}

function createAll(
  context: IExtensionContext,
  callback: (Folder: Pack, Builder: TemplateBuilder) => void
): Promise<void> {
  const builder = new TemplateBuilder(context);
  const pd = context.database.ProjectData;

  pd.behaviorPacks.packs.forEach((pack) => callback(pack, builder));
  pd.resourcePacks.packs.forEach((pack) => callback(pack, builder));
  pd.worlds.packs.forEach((pack) => callback(pack, builder));

  return builder.send();
}
