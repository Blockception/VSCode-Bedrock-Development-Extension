import * as fg from "fast-glob";
import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { JsonDocument } from "./Json/Json Document";
import { Manager } from "../Manager/Manager";
import { DupeCheckAdd } from "./Array";
import { GetParent } from "./File";
import { Console } from "../Console/Console";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { Manifest } from "../Types/Minecraft/Manifest/Manifest";

export interface ProjectFiles {
  WorldFolders: string[];
  ResourcePackFolders: string[];
  BehaviourPackFolders: string[];
  Workspaces: string[];
}

export async function GetProjectFiles(): Promise<ProjectFiles | undefined> {
  let WS = Manager.Connection.workspace.getWorkspaceFolders();

  return WS.then(
    (x) => new Promise<ProjectFiles | undefined>((resolve, reject) => resolve(CheckStructure(x)))
  );
}

function CheckStructure(folders: WorkspaceFolder[] | null): ProjectFiles | undefined {
  Console.Log("discovering workspace layout");
  let dirs: string[] = [];

  if (folders == null) return undefined;

  let PD: ProjectFiles = {
    BehaviourPackFolders: [],
    ResourcePackFolders: [],
    WorldFolders: [],
    Workspaces: [],
  };

  for (let I = 0; I < folders.length; I++) {
    const uri = folders[I].uri;
    let Path = URI.parse(uri).fsPath;
    PD.Workspaces.push(uri);
    dirs.push(Path);
  }

  for (let I = 0; I < dirs.length; I++) {
    let dir = dirs[I];

    if (!dir.endsWith("\\")) dir += "\\";

    dir = dir.replace(/\\/g, "/");
    dirs[I] = dir + "**/manifest.json";
  }

  const entries = fg.sync(dirs, { absolute: true, onlyFiles: true });

  for (let J = 0; J < entries.length; J++) {
    let item = entries[J];
    let parent = GetParent(item);
    let Type = DetectGeneralDataType(item);

    switch (Type) {
      case GeneralDataType.behaviour_pack:
        DupeCheckAdd(PD.BehaviourPackFolders, parent);
        continue;

      case GeneralDataType.resource_pack:
        DupeCheckAdd(PD.ResourcePackFolders, parent);
        continue;

      case GeneralDataType.world:
        DupeCheckAdd(PD.WorldFolders, parent);
        break;

      default:
        let JDoc = JsonDocument.GetDocument(item);
        let manifest = JDoc.CastTo<Manifest>();

        if (!manifest) break;

        Type = Manifest.DetectType(manifest);

        switch (Type) {
          case GeneralDataType.behaviour_pack:
            DupeCheckAdd(PD.BehaviourPackFolders, parent);
            continue;

          case GeneralDataType.resource_pack:
            DupeCheckAdd(PD.ResourcePackFolders, parent);
            continue;

          case GeneralDataType.world:
            DupeCheckAdd(PD.WorldFolders, parent);
            break;
        }
    }
  }

  return PD;
}
