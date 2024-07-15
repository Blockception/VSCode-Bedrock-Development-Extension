import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../code-action/builder";
import { Commands } from "@blockception/shared";


export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.block.missing":
    case "behaviorpack.block.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create bp block: '${id}'`, Commands.Create.Behaviorpack.Block, [id]);
      return;
  }
}
