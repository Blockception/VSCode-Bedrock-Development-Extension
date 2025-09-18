import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

import * as Deprecated from "./deprecated";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  switch (diag.code) {
    case "molang.function.deprecated":
      return Deprecated.onCodeAction(builder, diag);
  }
}
