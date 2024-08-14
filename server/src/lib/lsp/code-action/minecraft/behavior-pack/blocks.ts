import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.block.missing":
    case "behaviorpack.block.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create bp block: '${id}'`, Commands.Create.Behaviorpack.Block, [id]);
      return;
  }
}
