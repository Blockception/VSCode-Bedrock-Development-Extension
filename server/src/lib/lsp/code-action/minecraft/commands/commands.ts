import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { codeaction_execute_deprecated } from "./command-execute";

/**
 *
 * @param builder
 * @param diag
 */
export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  switch (diag.code) {
    case "minecraft.commands.execute.deprecated":
      return codeaction_execute_deprecated(builder, diag);
  }
}
