import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Commands } from '../../../Constants';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.animation_controller.missing":
    case "behaviorpack.animation_controller.missing":
    case "behaviorpack.anim_or_controller.missing":
      const id = builder.getId(diag.range);
      builder.Command(`Create bp animation controller: '${id}'`, Commands.Create.Behaviorpack.Animation_Controller, [id]);
      return;
  }
}
