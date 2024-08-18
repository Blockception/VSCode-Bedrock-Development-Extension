import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../builder";

import * as BP_AnimationControllers from "./behavior-pack/animation-controllers";
import * as BP_Animations from "./behavior-pack/animations";
import * as Family from "./behavior-pack/families";
import * as Commands from "./commands/commands";
import * as General from "./general";
import * as RP_AnimationControllers from "./resource-pack/animation-controllers";
import * as RP_Animations from "./resource-pack/animations";

/**
 *
 * @param builder
 * @param diag
 */
export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  const code = diag.code ?? "";

  if (typeof code === "number") return;

  //minecraft.
  const index = code.indexOf(".", 10);
  const subCode = index > -1 ? code.slice(10, index) : code.slice(10);

  switch (subCode) {
    case "animation":
      BP_Animations.onCodeAction(builder, diag);
      return RP_Animations.onCodeAction(builder, diag);

    case "animation_controller":
      BP_AnimationControllers.onCodeAction(builder, diag);
      return RP_AnimationControllers.onCodeAction(builder, diag);

    case "anim_or_controller":
      BP_Animations.onCodeAction(builder, diag);
      BP_AnimationControllers.onCodeAction(builder, diag);
      RP_Animations.onCodeAction(builder, diag);
      return RP_AnimationControllers.onCodeAction(builder, diag);

    case "commands":
      return Commands.onCodeAction(builder, diag);

    case "fakeentity":
      return General.FakeEntity.onCodeAction(builder, diag);

    case "family":
      return Family.onCodeAction(builder, diag);

    case "name":
      return General.Names.onCodeAction(builder, diag);

    case "objective":
      return General.Objectives.onCodeAction(builder, diag);

    case "tag":
      return General.Tags.onCodeAction(builder, diag);

    case "tickingarea":
      return General.TickingAreas.onCodeAction(builder, diag);
  }
}
