import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../code-action/builder";
import { Commands } from "@blockception/shared";

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.animation.missing":
    case "resourcepack.animation.missing":
    case "resourcepack.anim_or_controller.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create rp animation: '${id}'`, Commands.Create.Resourcepack.Animation, [id]);
      return;
  }
}
