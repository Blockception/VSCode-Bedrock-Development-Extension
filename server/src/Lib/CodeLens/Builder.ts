import { CodeLens, CodeLensParams } from "vscode-languageserver";

export class CodeLensBuilder {
  params: CodeLensParams;
  out: CodeLens[];

  constructor(params: CodeLensParams) {
    this.params = params;
    this.out = [];
  }

  Push(item: CodeLens) {
    if (item) {
      this.out.push(item);
    }
  }
}
