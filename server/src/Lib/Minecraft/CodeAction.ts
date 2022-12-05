import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../CodeAction/Builder";

import * as BehaviorPack from "./BehaviorPack";
import * as General from "./General/CodeAction";
import * as ResourcePack from "./ResourcePack";
import * as Commands from "./Commands/Command/CodeAction";

/**
 *
 * @param builder
 * @param diag
 */
export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  let code = diag.code ?? "";

  if (typeof code === "number") return;

  //minecraft.
  const index = code.indexOf(".", 10);
  const subCode = index > -1 ? code.slice(10, index) : code.slice(10);

  switch (subCode) {
    case "animation":
      BehaviorPack.Animations.OnCodeAction(builder, diag);
      return ResourcePack.Animations.OnCodeAction(builder, diag);

    case "animation_controller":
      BehaviorPack.AnimationControllers.OnCodeAction(builder, diag);
      return ResourcePack.AnimationControllers.OnCodeAction(builder, diag);

    case "anim_or_controller":
      BehaviorPack.Animations.OnCodeAction(builder, diag);
      BehaviorPack.AnimationControllers.OnCodeAction(builder, diag);
      ResourcePack.Animations.OnCodeAction(builder, diag);
      return ResourcePack.AnimationControllers.OnCodeAction(builder, diag);

    case "commands":
      return Commands.OnCodeAction(builder, diag);

    case "fakeentity":
      return General.FakeEntity.OnCodeAction(builder, diag);

    case "family":
      return BehaviorPack.Family.OnCodeAction(builder, diag);

    case "name":
      return General.Names.OnCodeAction(builder, diag);

    case "objective":
      return General.Objectives.OnCodeAction(builder, diag);

    case "tag":
      return General.Tag.OnCodeAction(builder, diag);

    case "tickingarea":
      return General.Tickingarea.OnCodeAction(builder, diag);
  }
}
