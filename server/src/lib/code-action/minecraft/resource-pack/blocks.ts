import { Diagnostic } from "vscode-languageserver";
import { Commands } from "@blockception/shared";
import { CodeActionBuilder } from "../../builder";
import { Definition } from "../../types/Definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.block.missing":
    case "resourcepack.block.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp block: '${id}'`, Commands.Create.Resourcepack.Blocks, [id]);
      return Definition(builder, diag, "block");
  }
}
