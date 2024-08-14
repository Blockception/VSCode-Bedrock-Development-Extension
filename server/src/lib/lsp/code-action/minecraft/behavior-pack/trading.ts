import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.trading.missing":
    case "behaviorpack.trading.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create loot table: '${id}'`, Commands.Create.Behaviorpack.Trading, [id]);
      return;
  }
}
