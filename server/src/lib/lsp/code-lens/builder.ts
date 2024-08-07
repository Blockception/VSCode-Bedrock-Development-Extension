import { CancellationToken, CodeLens, CodeLensParams } from "vscode-languageserver";

/**
 *
 */
export class CodeLensBuilder {
  public params: CodeLensParams;
  public token: CancellationToken;
  public out: CodeLens[];

  /**
   *
   * @param params
   */
  constructor(params: CodeLensParams, token: CancellationToken) {
    this.params = params;
    this.out = [];
    this.token = token;
  }

  /**
   *
   * @param item
   */
  push(item: CodeLens) {
    if (item) {
      this.out.push(item);
    }
  }
}
