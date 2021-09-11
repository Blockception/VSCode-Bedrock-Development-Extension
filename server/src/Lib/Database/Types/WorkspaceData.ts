import { MCProject } from "bc-minecraft-project";
import { WorkspaceFolder } from "vscode-languageserver";

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
  GetProject(docUri: string): MCProject {
    //Find most matching data
    for (var [key, data] of this.Data) {
      if (docUri.includes(key)) {
        const out = data;
        if (out) return out;

        break;
      }
    }

    return MCProject.createEmpty();
  }

  /**
   *
   * @param uri
   */
  GetFolder(docUri: string): string | undefined {
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
   * @param Folder
   * @param Data
   */
  Set(Folder: WorkspaceFolder | string, Data: MCProject): void {
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
  Remove(Folder: WorkspaceFolder | string): boolean {
    if (typeof Folder === "string") return this.Data.delete(Folder);

    return this.Data.delete(Folder.uri);
  }
}
