import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { definition } from "../../types/definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.block.missing":
    case "resourcepack.block.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create rp block: '${id}'`, Commands.Create.Resourcepack.Blocks, [id]);
      return definition(builder, diag, "block");
  }
}
