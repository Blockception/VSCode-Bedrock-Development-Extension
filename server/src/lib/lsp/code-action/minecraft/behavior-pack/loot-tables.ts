import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { Commands } from "@blockception/shared";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.loot_table.missing":
    case "behaviorpack.loot_table.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create loot table: '${id}'`, Commands.Create.Behaviorpack.Loot_Table, [id]);
      return;
  }
}
