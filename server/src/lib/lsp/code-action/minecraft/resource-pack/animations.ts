import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";
import { Commands } from "@blockception/shared";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.animation.missing":
    case "resourcepack.animation.missing":
    case "resourcepack.anim_or_controller.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create rp animation: '${id}'`, Commands.Create.Resourcepack.Animation, [id]);
      return;
  }
}
