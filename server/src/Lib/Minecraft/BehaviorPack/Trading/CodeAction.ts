import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Commands } from '../../../Constants';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.trading.missing":
    case "behaviorpack.trading.missing":
      const id = builder.getText(diag.range);
      builder.Command(`Create loot table: '${id}'`, Commands.Create.Behaviorpack.Trading, [id]);
      return;
  }
}
