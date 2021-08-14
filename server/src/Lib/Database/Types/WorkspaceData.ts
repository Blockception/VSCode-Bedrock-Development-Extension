import { MCProject } from "bc-minecraft-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { GetProjectFiles, ProjectFiles } from "../../Project/ProjectFiles";
import { ServerSettings } from "../../Server/Settings";
import { Definitions, ProjectData } from "../../Types/Project/Project";

/**
 *
 */
export class WorkspaceConfiguration implements ProjectData {
  /***/
  folder: string;
  /***/
  defintions: Definitions;
  /***/
  settings: ServerSettings;
  /***/
  ignores: string[];

  constructor(folder: string) {
    this.folder = folder;
    this.defintions = Definitions.createEmpty();
    this.ignores = [];
    this.settings = ServerSettings.clonedSettings();
  }
}

/**
 *
 */
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
    var docUri = URI.parse(docUri).fsPath;
    var found = undefined;

    //Find most matching data
    for (var [key, data] of this.Data) {
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

  /**
   *
   * @param Folder
   * @param Data
   */
  Set(Folder: WorkspaceFolder | string, Data: WorkspaceConfiguration): void {
    if (typeof Folder === "string") {
      this.Data.set(Folder, Data);
    } else {
      this.Data.set(Folder.uri, Data);
    }
  }

  /**
   *
   * @param Folder
   * @returns
   */
  Remove(Folder: WorkspaceFolder): boolean {
    return this.Data.delete(Folder.uri);
  }

  async Update(): Promise<ProjectFiles> {
    return GetProjectFiles();
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
  let uri = URI.parse(Workspace.uri).fsPath;
  let Config = new WorkspaceConfiguration(uri);
  let Project = MCProject.loadSync(uri);

  ProjectData.SetProject(Config, Project);
  receiver.Set(uri, Config);
  return Config;
}
