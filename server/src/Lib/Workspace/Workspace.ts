import { QueueProcessor } from "@daanv2/queue-processor";
import { Pack } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { HandleError } from "../Code/Error";
import { Fs } from "../Code/Url";
import { Database } from "../Database/Database";
import { Console } from "../Manager/Console";
import { Manager } from "../Manager/Manager";
import { MinecraftFormat } from "../Minecraft/Format";
import { ProcessPack } from "../Process/Pack";
import { GetProject } from "../Project/MCProjects";

/**
 *
 */
export namespace Workspace {
  /**
   *
   */
  export async function CreateMCProject(): Promise<void> {
    const ws = await Workspace.GetWorkSpaces();
    return processWorkspace(ws);
  }

  /**
   *
   * @returns
   */
  export async function UpdateProjectInfo(): Promise<void> {
    const ws = await Workspace.GetWorkSpaces();
    return processWorkspace(ws);
  }

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
   * @param folders The workspace folders to process */
  export function TraverseWorkspaces(folders: WorkspaceFolder[]): Promise<Pack[]> {
    const packs: Pack[] = [];

    //Setup queue processor
    const processor = new QueueProcessor(folders, (ws) => {
      //Processor workspace
      const p = TraverseWorkspace(ws);

      //Add outputted packs to the collection
      return p.then((ps) => {
        packs.push(...ps);
      });
    });

    //Wrap around the processor, if its done, return the packs
    return new Promise<Pack[]>((resolve, reject) => {
      processor.then((ws) => resolve(packs));
      processor.catch((reason) => reject(reason));
    });
  }

  /**Retrieves all the packs from the workspace and process the document
   * @param folder
   * @returns
   */
  export function TraverseWorkspace(folder: WorkspaceFolder): Promise<Pack[]> {
    const folderpath = Fs.FromVscode(folder.uri);
    Console.Info("Traversing workspace: " + folderpath);

    const project = GetProject(folderpath);
    Database.WorkspaceData.set(folder, project);

    const manifests = MinecraftFormat.GetManifests(folder.uri, project.ignores.patterns);
    const packs = Database.ProjectData.addPack(manifests, project);

    //Process each pack
    return new QueueProcessor(packs, processPack);
  }
}

/**
 * @param pack 
 * @returns 
 */
function processPack(pack: Pack): Promise<void> {
  return ProcessPack(pack).then((items) => {});
}

/**
 *
 * @param ws
 * @returns
 */
function processWorkspace(ws: WorkspaceFolder[] | null): void {
  if (ws === null) return;

  for (let I = 0; I < ws.length; I++) {
    const folder = ws[I].uri;
    const p = GetProject(folder);

    MCProject.saveSync(folder, p);
  }
}
