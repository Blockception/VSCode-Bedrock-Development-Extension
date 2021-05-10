import { CodeAction, CodeActionKind, Diagnostic } from "vscode-languageserver";
import { DiagnosticCodes } from "../../Constants";
import { CodeActionBuilder } from "../Builder";

export function TagCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  switch (diag.code) {
    case DiagnosticCodes.Tag.Missing:
      builder.Push(CodeAction.create("Add to definitions", CodeActionKind.QuickFix));

    default:
    case DiagnosticCodes.Tag.Excluded:
      return;
  }
}
