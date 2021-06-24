import { CodeAction, CodeActionParams, Command } from "vscode-languageserver";

/** */
export class CodeActionBuilder {
  /** */
  public params: CodeActionParams;
  /** */
  out: (Command | CodeAction)[];

  /** */
  constructor(params: CodeActionParams) {
    this.params = params;
    this.out = [];
  }

  /** */
  Push(item: Command | CodeAction | undefined): Command | CodeAction | undefined {
    if (item) {
      this.out.push(item);
    }

    return item;
  }
}
