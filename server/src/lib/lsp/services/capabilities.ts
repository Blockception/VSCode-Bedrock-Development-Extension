import { InitializeResult } from "vscode-languageserver";
import { entries } from "../../util/record";

type Capabilities = InitializeResult["capabilities"];

export class CapabilityBuilder {
  private base: Capabilities;

  constructor(base: Capabilities) {
    this.base = base ?? {};
  }

  result() {
    return this.base;
  }

  /**
   * Tell the client that this server supports code completion.
   * @param data
   */
  addCompletion(data: Capabilities["completionProvider"]) {
    return (this.base.completionProvider = {
      ...this.base.completionProvider,
      ...data,
    });
  }

  /**
   *
   * @param data
   * @returns
   */
  addWorkspace(data: Partial<Capabilities["workspace"]>) {
    if (!data) {
      return;
    }
    this.base.workspace = this.base.workspace || {};
    const fileOperations = (this.base.workspace.fileOperations = this.base.workspace.fileOperations || {});

    // Update file operations
    entries(data.fileOperations, (k, item) => {
      if (item === undefined) return;

      const data = (fileOperations[k] = fileOperations[k] || { filters: [] });
      data.filters.push(...item.filters);
    });

    if (data.workspaceFolders) {
      this.base.workspace.workspaceFolders = {
        ...this.base.workspace.workspaceFolders,
        ...data.workspaceFolders,
      };
    }

    return this.base.workspace;
  }

  set<K extends keyof Capabilities>(item: K, data: Capabilities[K]) {
    return (this.base[item] = data);
  }
}
