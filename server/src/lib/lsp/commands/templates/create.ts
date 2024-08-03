import { ExecuteCommandParams } from "vscode-languageserver/node";
import { TemplateBuilder } from "./builder";
import { Commands } from "@blockception/shared";
import { Pack } from "bc-minecraft-bedrock-project";
import { getFolders, Folders, EnsureFolders } from "./folders";
import { Context } from "../../context/context";
import { CommandContext } from "../context";
import { CommandManager } from "../manager";

import * as Language from "./language";
import * as Project from "./project";
import { IExtensionContext } from "../../extension/context";

type CreateFn = (context: Context<CommandContext>, folders: EnsureFolders) => Promise<boolean | void>;

/**Executes the given creation command */
function createCommand(callback: CreateFn) {
  return async function (context: Context<CommandContext>) {
    const folders = getFolders(context);
    const command = context.command;

    return callback(context, folders).then((value) => {});
  };
}

export function setupCreate(manager: CommandManager) {
  //General
  manager.add(Commands.Create.General.Languages, (context) => createAll(context, Language.create_language_files));
  manager.add(
    Commands.Create.General.Entity,
    createCommand((context: Context<CommandContext>) => {
      return Promise.all([
        manager.executeCommand(Commands.Create.Behaviorpack.Entity, context),
        manager.executeCommand(Commands.Create.Resourcepack.Entity, context),
      ]).then(() => {});
    })
  );
  manager.add(
    Commands.Create.General.Manifests,
    createCommand((context: Context<CommandContext>) => {
      return Promise.all([
        manager.executeCommand(Commands.Create.Behaviorpack.Manifests, context),
        manager.executeCommand(Commands.Create.Resourcepack.Manifests, context),
        manager.executeCommand(Commands.Create.World.Manifests, context),
      ]).then(() => {});
    })
  );

  //Project
  manager.add(
    Commands.Create.Project.WorldProject,
    createCommand((params) => FunctionWithID(params, Project.create_world_project))
  );
  manager.add(
    Commands.Create.Project.Resourcepack,
    createCommand((params) => FunctionWithID(params, Project.create_resourcepack))
  );
  manager.add(
    Commands.Create.Project.Behaviorpack,
    createCommand((params) => FunctionWithID(params, Project.create_behaviorpack))
  );
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
