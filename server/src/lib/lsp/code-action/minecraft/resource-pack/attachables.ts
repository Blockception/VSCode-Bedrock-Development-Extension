import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { definition } from "../../types/definition";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.attachable.missing":
    case "resourcepack.attachable.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create rp attachable: '${id}'`, Commands.Create.Resourcepack.Attachable, [id]);
      return definition(builder, diag, "attachable");
  }
}
