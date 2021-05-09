import { MCProject } from "bc-minecraft-project";
import { resourceUsage } from "process";
import { WorkspaceFolder } from "vscode-languageserver";
import { Manager } from "../../Manager/include";
import { ServerSettings } from "../../Server/Settings";
import { Definitions, ProjectData } from "../../Types/Project/Project";

export class WorkspaceConfiguration implements ProjectData {
  defintions: Definitions;
  settings: ServerSettings;
  ignores: string[];

  constructor() {
    this.defintions = Definitions.createEmpty();
    this.ignores = [];
    this.settings = ServerSettings.clonedSettings();
  }
}

export class WorkspaceData {
  private Data: Map<string, WorkspaceConfiguration>;

  constructor() {
    this.Data = new Map<string, WorkspaceConfiguration>();
  }

  /**
   *
   * @param uri
   */
  GetForDoc(docUri: string): WorkspaceConfiguration {
    var found = undefined;

    //Find most matching data
    for (var key in this.Data) {
      if (docUri.includes(key)) {
        if (found) {
          if (found.length < key.length) found = key;
        } else {
          found = key;
        }
      }
    }

    if (found) {
      let out = this.Data.get(found);

      if (out) return out;
    }

    return createNew();
  }

  /**
   *
   * @param Folders
   */
  Add(Folders: WorkspaceFolder[]): Promise<void[]> {
    let Out: Promise<void>[] = [];

    for (let I = 0; I < Folders.length; I++) {
      Out.push(AddAsync(Folders[I], this));
    }

    return Promise.all(Out);
  }

  Set(Folder: WorkspaceFolder, Data: WorkspaceConfiguration): void {
    this.Data.set(Folder.uri, Data);
  }

  Remove(Folder: WorkspaceFolder): boolean {
    return this.Data.delete(Folder.uri);
  }
}

function createNew(): WorkspaceConfiguration {
  return new WorkspaceConfiguration();
}

/**
 *
 * @param Workspace
 * @param Data
 * @returns
 */
async function AddAsync(Workspace: WorkspaceFolder, Data: WorkspaceData): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      Add(Workspace, Data);
      resolve();
    } catch (err) {}

    reject();
  });
}

/**
 *
 * @param Workspace
 * @param Data
 */
function Add(Workspace: WorkspaceFolder, receiver: WorkspaceData): void {
  let Config = new WorkspaceConfiguration();
  let Project = MCProject.loadSync(Workspace.uri);

  ProjectData.SetProject(Config, Project);
  receiver.Set(Workspace, Config);
}
