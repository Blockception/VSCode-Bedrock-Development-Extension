import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Commands } from '../../../Constants';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.loot_table.missing":
    case "behaviorpack.loot_table.missing":
      const id = builder.getText(diag.range);
      builder.Command(`Create loot table: '${id}'`, Commands.Create.Behaviorpack.Loot_Table, [id]);
      return;
  }
}
