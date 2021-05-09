import { MCProject } from "bc-minecraft-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { ServerSettings } from "../../Server/Settings";
import { Definitions, ProjectData } from "../../Types/Project/Project";

export class WorkspaceConfiguration implements ProjectData {
  folder: string;
  defintions: Definitions;
  settings: ServerSettings;
  ignores: string[];

  constructor(folder: string) {
    this.folder = folder;
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

    return createNew("NONE");
  }

  /**
   *
   * @param Folders
   */
  Add(Folders: WorkspaceFolder[]): Promise<WorkspaceConfiguration[]> {
    let Out: Promise<WorkspaceConfiguration>[] = [];

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

function createNew(folder: string): WorkspaceConfiguration {
  return new WorkspaceConfiguration(folder);
}

/**
 *
 * @param Workspace
 * @param Data
 * @returns
 */
async function AddAsync(Workspace: WorkspaceFolder, Data: WorkspaceData): Promise<WorkspaceConfiguration> {
  return new Promise((resolve, reject) => {
    try {
      let out = Add(Workspace, Data);
      resolve(out);
    } catch (err) {}

    reject(createNew(Workspace.uri));
  });
}

/**
 *
 * @param Workspace
 * @param Data
 */
function Add(Workspace: WorkspaceFolder, receiver: WorkspaceData): WorkspaceConfiguration {
  let Config = new WorkspaceConfiguration(Workspace.uri);
  let Project = MCProject.loadSync(Workspace.uri);

  ProjectData.SetProject(Config, Project);
  receiver.Set(Workspace, Config);
  return Config;
}
