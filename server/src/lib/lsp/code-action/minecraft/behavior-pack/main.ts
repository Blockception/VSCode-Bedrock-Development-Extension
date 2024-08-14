import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../builder";

import * as AnimationControllers from "./animation-controllers";
import * as Animations from "./animations";
import * as Block from "./blocks";
import * as Entities from "./entities";
import * as Family from "./families";
import * as Items from "./items";
import * as LootTables from "./loot-tables";
import * as Functions from "./mcfunctions";
import * as Structures from "./structures";
import * as Trading from "./trading";

/**
 *
 * @param builder
 * @param diag
 */
export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  let code = diag.code ?? "";

  if (typeof code === "number") return;

  const index = code.indexOf(".", 13);
  const subcode = index > -1 ? code.slice(13, index) : code.slice(13);

  switch (subcode) {
    case "animation_controller":
      return AnimationControllers.onCodeAction(builder, diag);

    case "animation":
      return Animations.onCodeAction(builder, diag);

    case "anim_or_controller":
      AnimationControllers.onCodeAction(builder, diag);
      return Animations.onCodeAction(builder, diag);

    case "block":
      return Block.onCodeAction(builder, diag);

    case "entity":
      return Entities.onCodeAction(builder, diag);

    case "family":
      return Family.onCodeAction(builder, diag);

    case "mcfunction":
    case "function":
      return Functions.onCodeAction(builder, diag);

    case "item":
      return Items.onCodeAction(builder, diag);

    case "loot_table":
      return LootTables.onCodeAction(builder, diag);

    case "mcstructure":
    case "structure":
      return Structures.onCodeAction(builder, diag);

    case "trading":
      return Trading.onCodeAction(builder, diag);
  }
}
