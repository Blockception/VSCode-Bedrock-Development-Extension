import { Folders } from "../../templates/folders";
import { create_language_files } from "../../templates/language";
import { TemplateBuilder } from "../../templates/builder";
import { TextEditBuilder } from "./language";
import { Vscode } from "../../../util";
import { mustExecute } from "./functions";
import { Commands } from "@blockception/shared";
import { Context } from "../../context/context";
import { CommandContext } from "../context";

export async function create_world_project(
  context: Context<CommandContext>,
  id: string,
  folders: Folders,
  builder: TemplateBuilder
): Promise<void> {
  const Folder = Vscode.join(folders.WorkSpace(), "world");

  const nfolders = {
    WorkSpace: () => folders.WorkSpace(),
    BehaviorPack: () => Vscode.join(Folder, "behavior_packs", id + "-bp"),
    ResourcePack: () => Vscode.join(Folder, "resource_packs", id + "-rp"),
    WorldFolder: () => Folder,
  };

  await Promise.all([
    mustExecute(Commands.Create.World.Manifests, context, nfolders.WorldFolder()),
    mustExecute(Commands.Create.Behaviorpack.Manifests, context, nfolders.BehaviorPack()),
    mustExecute(Commands.Create.Resourcepack.Manifests, context, nfolders.ResourcePack()),
  ]);

  //create world manifest
  create_language_files(nfolders.BehaviorPack(), builder, languageBP);
  create_language_files(nfolders.ResourcePack(), builder, languageRP);
  create_language_files(nfolders.WorldFolder(), builder, languageWP);
}

/**
 *
 * @param id
 * @param context
 * @param builder
 */
export async function create_behaviorpack(
  context: Context<CommandContext>,
  id: string,
  folders: Folders,
  builder: TemplateBuilder
): Promise<void> {
  const folder = Vscode.join(folders.WorkSpace(), `${id}-bp`);
  const nfolders = {
    WorkSpace: () => folders.WorkSpace(),
    BehaviorPack: () => folder,
    ResourcePack: () => folder,
    WorldFolder: folders.WorldFolder,
  };

  await mustExecute(Commands.Create.Behaviorpack.Manifests, context, nfolders.BehaviorPack());
  create_language_files(folder, builder, languageBP);
}

/**
 *
 * @param id
 * @param folders
 * @param builder
 */
export async function create_resourcepack(
  context: Context<CommandContext>,
  id: string,
  folders: Folders,
  builder: TemplateBuilder
): Promise<void> {
  const folder = Vscode.join(folders.WorkSpace(), `${id}-rp`);
  const nfolders = {
    WorkSpace: folders.WorkSpace,
    BehaviorPack: () => folder,
    ResourcePack: () => folder,
    WorldFolder: folders.WorldFolder,
  };

  await mustExecute(Commands.Create.Resourcepack.Manifests, context, nfolders.ResourcePack());
  create_language_files(folder, builder, languageRP);
}

function languageWP(text: TextEditBuilder): void {
  text.Add("pack.name", "Example wp pack name");
  text.Add("pack.description", "The text that describes this world example pack");
}

function languageBP(text: TextEditBuilder): void {
  text.Add("pack.name", "Example wp pack name");
  text.Add("pack.description", "The behaviors for the project");
}

function languageRP(text: TextEditBuilder): void {
  text.Add("pack.name", "Example resource pack name");
  text.Add("pack.description", "The resources for the project");
}
