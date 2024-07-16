import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../builder";

import * as BehaviorPack from "./behavior-pack/main";
import * as General from "../../Minecraft/General/CodeAction";
import * as ResourcePack from "../../Minecraft/ResourcePack";
import * as Commands from "./commands/commands";

/**
 *
 * @param builder
 * @param diag
 */
export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  let code = diag.code ?? "";

  if (typeof code === "number") return;

  //minecraft.
  const index = code.indexOf(".", 10);
  const subCode = index > -1 ? code.slice(10, index) : code.slice(10);

  switch (subCode) {
    case "animation":
      BehaviorPack.Animations.onCodeAction(builder, diag);
      return ResourcePack.Animations.onCodeAction(builder, diag);

    case "animation_controller":
      BehaviorPack.AnimationControllers.onCodeAction(builder, diag);
      return ResourcePack.AnimationControllers.onCodeAction(builder, diag);

    case "anim_or_controller":
      BehaviorPack.Animations.onCodeAction(builder, diag);
      BehaviorPack.AnimationControllers.onCodeAction(builder, diag);
      ResourcePack.Animations.onCodeAction(builder, diag);
      return ResourcePack.AnimationControllers.onCodeAction(builder, diag);

    case "commands":
      return Commands.onCodeAction(builder, diag);

    case "fakeentity":
      return General.FakeEntity.onCodeAction(builder, diag);

    case "family":
      return BehaviorPack.Family.onCodeAction(builder, diag);

    case "name":
      return General.Names.onCodeAction(builder, diag);

    case "objective":
      return General.Objectives.onCodeAction(builder, diag);

    case "tag":
      return General.Tag.onCodeAction(builder, diag);

    case "tickingarea":
      return General.Tickingarea.onCodeAction(builder, diag);
  }
}
