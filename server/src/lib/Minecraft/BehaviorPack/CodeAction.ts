import { Diagnostic } from "vscode-languageserver";
import { CodeActionBuilder } from "../../CodeAction/Builder";
import * as AnimationControllers from "./AnimationControllers/CodeAction";
import * as Animations from "./Animations/CodeAction";
import * as Block from "./Block/CodeAction";
//import * as BlockStates from "./BlockStates/CodeAction";
import * as Entities from "./Entities/CodeAction";
//import * as EntityEvent from "./EntityEvent/CodeAction";
import * as Family from "./Family/CodeAction";
import * as Functions from "./Functions/CodeAction";
import * as Items from "./Items/CodeAction";
import * as LootTables from "./LootTables/CodeAction";
import * as Structures from "./Structures/CodeAction";
import * as Trading from "./Trading/CodeAction";

/**
 *
 * @param builder
 * @param diag
 */
export function OnCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  let code = diag.code ?? "";

  if (typeof code === "number") return;

  const index = code.indexOf(".", 13);
  const subcode = index > -1 ? code.slice(13, index) : code.slice(13);

  switch (subcode) {
    case "animation_controller":
      return AnimationControllers.OnCodeAction(builder, diag);

    case "animation":
      return Animations.OnCodeAction(builder, diag);

    case "anim_or_controller":
      AnimationControllers.OnCodeAction(builder, diag);
      return Animations.OnCodeAction(builder, diag);

    case "block":
      return Block.OnCodeAction(builder, diag);

    case "entity":
      return Entities.OnCodeAction(builder, diag);

    case "family":
      return Family.OnCodeAction(builder, diag);

    case "mcfunction":
    case "function":
      return Functions.OnCodeAction(builder, diag);

    case "item":
      return Items.OnCodeAction(builder, diag);

    case "loot_table":
      return LootTables.OnCodeAction(builder, diag);

    case "mcstructure":
    case "structure":
      return Structures.OnCodeAction(builder, diag);

    case "trading":
      return Trading.OnCodeAction(builder, diag);
  }
}
