import { TemplateBuilder } from "../../templates/builder";
import { Commands } from "@blockception/shared";
import { Pack } from "bc-minecraft-bedrock-project";
import { getFolders, Folders, EnsureFolders } from "../../templates/folders";
import { Context } from "../../context/context";
import { CommandContext } from "../context";
import { CommandManager } from "../manager";
import { IExtensionContext } from "../../extension/context";
import { getTemplateCommand } from "./templates";

import * as Language from "../../templates/language";
import * as Project from "../../templates/project";

type CreateFn = (context: Context<CommandContext>, folders: EnsureFolders) => Promise<boolean | void>;

/**Executes the given creation command */
function createCommand(callback: CreateFn) {
  return async function (context: Context<CommandContext>) {
    const folders = getFolders(context);

    return callback(context, folders).then((value) => {});
  };
}

function mustExecute(
  commandId: string,
  context: Context<CommandContext>,
  folder?: string | undefined,
  attributes: Record<string, string> = {}
) {
  const t = getTemplateCommand(commandId);
  if (t === undefined) throw new Error("couldn't find template command: " + commandId);

  return t.execute(context, folder, attributes);
}

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
  callback: (ID: string, context: Folders, builder: TemplateBuilder) => void
): Promise<void> {
  const folders = getFolders(context);
  const ids = context.args;
  if (!ids) return;
  if (!folders) return;

  const builder = new TemplateBuilder(context);

  //Last is reserved for the document
  for (let I = 0; I < ids.length - 1; I++) {
    callback(ids[I], folders, builder);
  }

  return builder.send();
}

function createAll(
  context: IExtensionContext,
  callback: (Folder: Pack, Builder: TemplateBuilder) => void
): Promise<void> {
  const builder = new TemplateBuilder(context);

  context.database.ProjectData.behaviorPacks.packs.forEach((pack) => callback(pack, builder));
  context.database.ProjectData.resourcePacks.packs.forEach((pack) => callback(pack, builder));
  context.database.ProjectData.worlds.packs.forEach((pack) => callback(pack, builder));

  return builder.send();
}
