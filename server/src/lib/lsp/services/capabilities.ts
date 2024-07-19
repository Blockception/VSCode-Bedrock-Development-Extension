import { InitializeResult } from "vscode-languageserver";

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
    this.base.completionProvider = {
      ...this.base.completionProvider,
      ...data,
    };
  }
}
