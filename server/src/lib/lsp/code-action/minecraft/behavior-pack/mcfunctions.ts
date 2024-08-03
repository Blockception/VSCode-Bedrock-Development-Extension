import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { definition } from "../../types/definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.mcfunction.missing":
    case "behaviorpack.mcfunction.missing":
      return definition(builder, diag, "function");
  }
}
