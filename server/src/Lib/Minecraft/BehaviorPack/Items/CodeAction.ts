import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Commands } from '../../../../../../shared/src';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.item.missing":
    case "behaviorpack.item.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create bp item: '${id}'`, Commands.Create.Behaviorpack.Item, [id]);
      return;
  }
}
