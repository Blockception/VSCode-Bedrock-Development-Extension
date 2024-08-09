import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { Commands } from "@blockception/shared";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.item.missing":
    case "behaviorpack.item.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create bp item: '${id}'`, Commands.Create.Behaviorpack.Item, [id]);
      return;
  }
}
