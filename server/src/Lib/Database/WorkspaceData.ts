import { MCProject } from "bc-minecraft-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { GetProjectEmpty } from "../Project/MCProjects";

/**
 *
 */
export class WorkspaceData {
  /**<Workspace Uri, Project Data> */
  private _data: Map<string, MCProject>;

  constructor() {
    this._data = new Map<string, MCProject>();
  }

  /**
   *
   * @param uri
   */
  getProject(docUri: string): MCProject {
    //Find most matching data
    for (var [key, data] of this._data) {
      if (docUri.includes(key)) {
        const out = data;
        if (out) return out;

        break;
      }
    }

    return GetProjectEmpty();
  }

  /**Gets the workspace folder that corresponds to the given document
   * @param uri The document uri to compare*/
  getFolder(docUri: string): string | undefined {
    //Find most matching data
    for (var [key, data] of this._data) {
      if (docUri.includes(key)) {
        return key;
      }
    }

    return undefined;
  }

  /**
   *
   * @returns
   */
  getFirst(): string | undefined {
    for (var [key, data] of this._data) {
      if (data) {
        return key;
      }
    }

    return undefined;
  }

  /**
   *
   * @param Folder
   * @param Data
   */
  set(Folder: WorkspaceFolder | string, Data: MCProject): void {
    this._data.set(typeof Folder === "string" ? Folder : Folder.uri, Data);
  }

  /**
   *
   * @param Folder
   * @returns
   */
  remove(Folder: WorkspaceFolder | string): boolean {
    if (typeof Folder === "string") return this._data.delete(Folder);

    return this._data.delete(Folder.uri);
  }

  /**
   *
   * @param callbackfn
   * @param thisArg
   */
  forEach(
    callbackfn: (value: MCProject, workspaceUri: string, map: Map<string, MCProject>) => void,
    thisArg?: any
  ): void {
    this._data.forEach(callbackfn, thisArg || this);
  }
}
