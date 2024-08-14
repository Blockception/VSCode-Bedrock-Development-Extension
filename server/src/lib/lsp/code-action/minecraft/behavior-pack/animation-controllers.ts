import { Commands } from "@blockception/shared";
import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.animation_controller.missing":
    case "behaviorpack.animation_controller.missing":
    case "behaviorpack.anim_or_controller.missing":
      const id = builder.getId(diag.range);
      builder.command(`Create bp animation controller: '${id}'`, Commands.Create.Behaviorpack.Animation_Controller, [id]);
      return;
  }
}
