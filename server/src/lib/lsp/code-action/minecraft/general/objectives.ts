import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { definition } from "../../types/definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.objective.missing":
      return definition(builder, diag, "objective");
  }
}
