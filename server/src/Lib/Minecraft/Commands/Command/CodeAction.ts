import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from '../../../CodeAction/Builder';
import { codeaction_execute_deprecated } from './CodeActions/Execute';

/**
 *
 * @param builder
 * @param diag
 */
export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  switch (diag.code) {
    case "minecraft.commands.execute.deprecated":
      return codeaction_execute_deprecated(builder, diag);
  }
}
