import { InitializeResult } from "vscode-languageserver";
import { entries } from "../../util";

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

  set<K extends keyof Capabilities>(item: K, data: Capabilities[K]) {
    return (this.base[item] = data);
  }
}
