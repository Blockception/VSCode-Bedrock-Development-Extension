import { Pack } from "bc-minecraft-bedrock-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { HandleError } from "../Code/Error";
import { Fs } from "../Code/Url";
import { Database } from "../Database/include";
import { Console } from "../Manager/Console";
import { Manager } from "../Manager/Manager";
import { MinecraftFormat } from "../Minecraft/Format";
import { AddBlockception } from "../Minecraft/General/Manifests.ts/Functions";
import { ProcessPack } from "../Process/Pack";
import { GetProject } from "../Project/MCProjects";

/**
 *
 */
export namespace Workspace {
  /**
   *
   * @returns
   */
  export async function GetWorkSpaces(): Promise<WorkspaceFolder[]> {
    const WS = Manager.Connection.workspace.getWorkspaceFolders();

    WS.catch((err) => {
      Console.Error(`No workspaces folders received`);
      HandleError(err);
    });

    return WS.then((ws) => {
      if (ws == null) {
        ws = [];
      }

      return ws;
    });
  }

  /**
   *
   * @param uri
   */
  export function RemoveWorkspace(uri: string): void {
    Console.Info("deleting workspace data: " + uri);
    Database.WorkspaceData.remove(uri);

    const PD = Database.ProjectData;

    RemoveFromPacks(PD.BehaviorPacks.packs, uri, PD.BehaviorPacks.delete);
    RemoveFromPacks(PD.ResourcePacks.packs, uri, PD.ResourcePacks.delete);
    PD.General.fakeEntities.deleteFile(uri);
  }

  function RemoveFromPacks(packs: Pack[], uri: string, deletefn: (folder: string) => boolean): void {
    for (var I = 0; I < packs.length; I++) {
      const p = packs[I];

      if (p.folder.startsWith(uri)) deletefn(p.folder);
    }
  }

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
   * @returns
   */
  export function TraverseWorkspace(folder: WorkspaceFolder): Pack[] {
    const folderpath = Fs.FromVscode(folder.uri);
    Console.Info("Traversing workspace: " + folderpath);

    const project = GetProject(folderpath);
    Database.WorkspaceData.set(folder, project);

    const manifests = MinecraftFormat.GetManifests(folder.uri, project.ignores.patterns);
    const packs = Database.ProjectData.addPack(manifests, project);

    //Process each pack
    packs.forEach(ProcessPack);

    return packs;
  }
}
