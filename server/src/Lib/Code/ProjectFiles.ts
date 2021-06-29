import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { JsonDocument } from "../Types/Document/Json Document";
import { Manager } from "../Manager/Manager";
import { DupeCheckAdd } from "./Array";
import { GetParent } from "./File";
import { Console } from "../Console/Console";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { Manifest } from "../Types/Minecraft/Manifest/Manifest";
import { Database } from "../Database/include";
import { WorkspaceConfiguration } from "../Database/Types/WorkspaceData";
import { Glob } from "../Glob/Glob";

/**
 *
 */
export interface ProjectFiles {
  /**
   *
   */
  WorldFolders: string[];

  /**
   *
   */
  ResourcePackFolders: string[];

  /**
   *
   */
  BehaviorPackFolders: string[];

  /**
   *
   */
  Workspaces: string[];
}

/**Retrieves workspaces and then updated the @see Database.WorkspaceData
 * @returns A promise with project related files*/
export async function GetProjectFiles(): Promise<ProjectFiles> {
  const WS = Manager.Connection.workspace.getWorkspaceFolders();

  WS.catch((item) => Console.Error(`No workspaces folders received: ${JSON.stringify(item)}`));

  return WS.then((x) => Traverse(x));
}

/**
 *
 * @param folders
 * @returns
 */
async function Traverse(folders: WorkspaceFolder[] | null): Promise<ProjectFiles> {
  let PF: ProjectFiles = {
    BehaviorPackFolders: [],
    ResourcePackFolders: [],
    WorldFolders: [],
    Workspaces: [],
  };

  if (folders === null) {
    return Promise.resolve(PF);
  }

  return Database.WorkspaceData.Add(folders).then((ws) => {
    CheckStructure(ws, PF);
    return PF;
  });
}

/**
 *
 * @param folders
 * @param PD
 * @returns
 */
function CheckStructure(folders: WorkspaceConfiguration[] | null, PF: ProjectFiles): void {
  Console.Log("discovering workspace layout");

  if (folders == null) return undefined;

  for (let I = 0; I < folders.length; I++) {
    GetWorkspaceFiles(folders[I], PF);
  }

  Console.Log("workspace layout discovered");
}

/**
 *
 * @param folder
 * @param PF
 */
export function GetWorkspaceFiles(Ws: WorkspaceConfiguration, PF: ProjectFiles): void {
  PF.Workspaces.push(Ws.folder);

  const dir = Glob.EnsureSource(Ws.folder);
  let dirs: string[] = typeof dir === "string" ? [dir] : dir;

  for (let I = 0; I < dirs.length; I++) {
    let dir = dirs[I];

    if (!dir.endsWith("\\")) dir += "\\";

    dir = dir.replace(/\\/g, "/");
    dirs[I] = dir + "**/manifest.json";
  }

  const entries = Glob.GetFiles(dirs, Ws.ignores);

  Console.Log(`Found ${entries.length} manifests`);

  Process(entries, PF);
}

/**
 *
 * @param files
 * @param PF
 */
function Process(files: string[], PF: ProjectFiles): void {
  for (let J = 0; J < files.length; J++) {
    const item = files[J];
    const parent = URI.parse(GetParent(item)).fsPath;
    const Type = DetectGeneralDataType(item);

    switch (Type) {
      case GeneralDataType.behavior_pack:
        DupeCheckAdd(PF.BehaviorPackFolders, parent);
        continue;

      case GeneralDataType.resource_pack:
        DupeCheckAdd(PF.ResourcePackFolders, parent);
        continue;

      case GeneralDataType.world:
        DupeCheckAdd(PF.WorldFolders, parent);
        break;

      default:
        const JDoc = JsonDocument.GetDocument(item);
        const manifest = JDoc.CastTo<Manifest>();

        if (!manifest) break;

        const SubType = Manifest.DetectType(manifest);

        switch (SubType) {
          case GeneralDataType.behavior_pack:
            DupeCheckAdd(PF.BehaviorPackFolders, parent);
            continue;

          case GeneralDataType.resource_pack:
            DupeCheckAdd(PF.ResourcePackFolders, parent);
            continue;

          case GeneralDataType.world:
            DupeCheckAdd(PF.WorldFolders, parent);
            break;
        }
    }
  }
}
