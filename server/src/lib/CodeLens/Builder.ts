import { CodeLens, CodeLensParams } from "vscode-languageserver";

/**
 *
 */
export class CodeLensBuilder {
  /**
   *
   */
  public params: CodeLensParams;
  /**
   *
   */
  public out: CodeLens[];

  /**
   *
   * @param params
   */
  constructor(params: CodeLensParams) {
    this.params = params;
    this.out = [];
  }

  /**
   *
   * @param item
   */
  Push(item: CodeLens) {
    if (item) {
      this.out.push(item);
    }
  }
}
