import { BehaviorPack, Pack, ResourcePack } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import path from "path/posix";
import { WorkspaceFolder } from "vscode-languageserver";
import { Console } from "../../Console/Console";
import { Database } from "../../Database/include";
import { MinecraftFormat } from "../../Minecraft/Format";
import { Document } from "../../Types/include";

/**Retrieves all the packs from the workspaces and process the document
 * @param folders
 */
export function TraverseWorkspaces(folders: WorkspaceFolder[]): Pack[] {
  const out: Pack[] = [];

  folders.forEach((ws) => {
    out.push(...TraverseWorkspace(ws));
  });

  return out;
}

/**Retrieves all the packs from the workspace and process the document
 * @param folder
 */
export function TraverseWorkspace(folder: WorkspaceFolder): Pack[] {
  const project = MCProject.loadSync(folder.uri);
  const manifests = MinecraftFormat.GetManifests(folder.uri, project.ignores.patterns);

  const packs = Database.ProjectData.addPack(manifests, project);

  //Process each pack
  packs.forEach(ProcessPack);
  return packs;
}

/**
 *
 * @param pack
 */
export function ProcessPack(pack: Pack): void {
  Console.Info(`Processing pack: ${path.dirname(pack.folder)}`);

  const ignores = pack.context.ignores.patterns;
  const folder = pack.folder;
  let files: string[];

  if (BehaviorPack.BehaviorPack.is(pack)) {
    files = MinecraftFormat.GetBehaviorPackFiles(folder, ignores);
  } else if (ResourcePack.ResourcePack.is(pack)) {
    files = MinecraftFormat.GetResourcePackFiles(folder, ignores);
  } else {
    files = MinecraftFormat.GetPackFiles(folder, ignores);
  }

  Document.ForEachDocument(files, pack.process);
}
