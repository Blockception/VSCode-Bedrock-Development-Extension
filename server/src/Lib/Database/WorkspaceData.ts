import { MCProject } from "bc-minecraft-project";
import { WorkspaceFolder } from "vscode-languageserver";
import { GetProjectEmpty } from '../Project/include';

/**
 *
 */
export class WorkspaceData {
  private Data: Map<string, MCProject>;

  constructor() {
    this.Data = new Map<string, MCProject>();
  }

  /**
   *
   * @param uri
   */
  getProject(docUri: string): MCProject {
    //Find most matching data
    for (var [key, data] of this.Data) {
      if (docUri.includes(key)) {
        const out = data;
        if (out) return out;

        break;
      }
    }

    return GetProjectEmpty()
  }

  /**Gets the workspace folder that corresponds to the given document
   * @param uri The document uri to compare*/
  getFolder(docUri: string): string | undefined {
    //Find most matching data
    for (var [key, data] of this.Data) {
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
    for (var [key, data] of this.Data) {
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
  remove(Folder: WorkspaceFolder | string): boolean {
    if (typeof Folder === "string") return this.Data.delete(Folder);

    return this.Data.delete(Folder.uri);
  }

  /**
   *
   * @param callbackfn
   * @param thisArg
   */
  forEach(callbackfn: (value: MCProject, key: string, map: Map<string, MCProject>) => void, thisArg?: any): void {
    this.Data.forEach(callbackfn);
  }
}
