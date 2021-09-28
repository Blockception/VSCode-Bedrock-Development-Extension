import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../../CodeAction/Builder";
import { Commands } from '../../../Constants';

export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic) {
  switch (diag.code) {
    case "minecraft.animation.missing":
    case "behaviorpack.animation.missing":
    case "behaviorpack.anim_or_controller.missing":
      const id = builder.getText(diag.range);
      builder.Command(`Create bp animation: '${id}'`, Commands.Create.Behaviorpack.Animation, [id]);
      return;
  }
}
