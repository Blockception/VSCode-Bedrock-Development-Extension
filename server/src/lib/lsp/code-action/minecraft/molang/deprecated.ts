import { CodeActionKind, Diagnostic, TextEdit } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { MolangData } from "bc-minecraft-molang";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  const id = builder.getText(diag.range);
  if (id === "") return;

  const [scope, fnName] = id.split(".");

  const data = scope.startsWith("q") ? MolangData.General.getQuery(fnName) : MolangData.General.getMath(fnName);
  if (!data || !data.deprecated) return;
  if (!data.deprecated.startsWith("q") && !data.deprecated.startsWith("m")) return;

  const newId = data.deprecated;
  builder.push({
    title: "Replace with: " + newId,
    kind: CodeActionKind.QuickFix,
    diagnostics: [diag],
    isPreferred: true,
    edit: {
      changes: {
        [builder.context.document.uri]: [TextEdit.replace(diag.range, newId)],
      },
    },
  });
}
