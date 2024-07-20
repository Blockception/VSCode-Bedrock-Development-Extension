import { ExecuteCommandParams } from "vscode-languageserver/node";
import { TemplateBuilder } from "./builder";
import { Console } from "../../../manager/console";
import { Commands } from "@blockception/shared";
import { Database } from "../../../lsp/database/database";
import { Pack } from "bc-minecraft-bedrock-project";
import { GetContext, Context, EnsureContext } from "./context";
import { TemplateKeys, Templates } from "./templates";

import * as Language from "./language";
import * as Project from "./project";

type CreateFn = (params: ExecuteCommandParams, context: EnsureContext) => Promise<boolean | void>;
type CommandManager = Record<string, CreateFn>;
const CreationCommands: CommandManager = initialize();

/**Executes the given creation command */
export async function Create(params: ExecuteCommandParams): Promise<void> {
  const context = GetContext(params);
  const command = params.command;
  const folder = context.GetFolder(command);
  const templateId = command.replace(Commands.Create.Base, "") as TemplateKeys;
  const id = (params.arguments ? params.arguments[0] : undefined) || "UNKNOWN";

  const attributes = {
    id,
    templateId,
  };

  if ((await Templates.create(templateId, folder, attributes)) === true) {
    return;
  }

  const fn = CreationCommands[params.command];
  if (fn) {
    return fn(params, context).then((value) => {});
  } else {
    Console.Error("Unknown creation command: " + params.command);
  }
}

function initialize(): CommandManager {
  const Out: CommandManager = {};

  //General
  Out[Commands.Create.General.Entity] = (params: ExecuteCommandParams, context: Context) => {
    const id = params.arguments ? params.arguments[0] : undefined;

    const attributes = {
      id,
    }

    return PromisesAll(
      Templates.create("behavior-entity", context.BehaviorPack(), attributes),
      Templates.create("resource-entity", context.ResourcePack(), attributes)
    );
  };
  Out[Commands.Create.General.Languages] = () => {
    return CreateAll(Language.create_language_files);
  };
  Out[Commands.Create.General.Manifests] = (params: ExecuteCommandParams, context: EnsureContext) => {
    const ensured = context.Ensure();
    const id = params.arguments ? params.arguments[0] : undefined;

    const attributes = {
      id,
    }

    return PromisesAll(
      Templates.create("behavior-manifest", ensured.BehaviorPack(), attributes),
      Templates.create("resource-manifest", ensured.ResourcePack(), attributes),
      Templates.create("world-manifest", ensured.ResourcePack(), attributes)
    );
  };

  //Project
  Out[Commands.Create.Project.WorldProject] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, Project.create_world_project);
  Out[Commands.Create.Project.Resourcepack] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, Project.create_resourcepack);
  Out[Commands.Create.Project.Behaviorpack] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, Project.create_behaviorpack);

  return Out;
}

/**
 *
 * @param params
 * @param callback
 */
function FunctionWithID(
  params: ExecuteCommandParams,
  callback: (ID: string, context: Context, Builder: TemplateBuilder) => void
): Promise<void> {
  const context = GetContext(params);

  const IDs = params.arguments;
  if (!IDs) return Promise.resolve();
  if (!context) return Promise.resolve();

  const Builder = new TemplateBuilder();

  //Last is reserved for the document
  for (let I = 0; I < IDs.length - 1; I++) {
    callback(IDs[I], context, Builder);
  }

  return Builder.Send();
}

function CreateAll(callback: (Folder: Pack, Builder: TemplateBuilder) => void): Promise<void> {
  const Builder = new TemplateBuilder();

  Database.ProjectData.BehaviorPacks.packs.forEach((pack) => callback(pack, Builder));
  Database.ProjectData.ResourcePacks.packs.forEach((pack) => callback(pack, Builder));
  Database.ProjectData.Worlds.packs.forEach((pack) => callback(pack, Builder));

  return Builder.Send();
}

function PromisesAll(...promises: Promise<boolean>[]): Promise<boolean> {
  return new Promise((resolve, reject) => {
    Promise.all(promises).then((values) => {
      let out = true;
      values.forEach((value) => (out &&= value));

      return out;
    });
  });
}
