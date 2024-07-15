import { Diagnostic } from "vscode-languageserver";
import { Commands } from "@blockception/shared";
import { CodeActionBuilder } from "../../../code-action/builder";

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.trading.missing":
    case "behaviorpack.trading.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create loot table: '${id}'`, Commands.Create.Behaviorpack.Trading, [id]);
      return;
  }
}
