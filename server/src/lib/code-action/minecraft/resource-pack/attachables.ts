import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { Definition } from "../../types/Definition";
import { Commands } from "@blockception/shared";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.attachable.missing":
    case "resourcepack.attachable.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp attachable: '${id}'`, Commands.Create.Resourcepack.Attachable, [id]);
      return Definition(builder, diag, "attachable");
  }
}
