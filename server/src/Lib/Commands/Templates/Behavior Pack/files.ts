import { TemplateBuilder } from "../Builder";
import * as path from "path";
import { context } from "../Context";
import { SafeIDNoNamespace } from "../../../Data/Templates/include";
import { Templates } from "../../../Data/include";
const { v4: uuid } = require("uuid");

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_animation_controller_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "animation_controllers", safeID + ".controller.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_animation_controller(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_animation_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "animations", safeID + ".animation.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_animation(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_block_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "blocks", safeID + ".block.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_block(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_entity_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "entities", safeID + ".entity.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_entity(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_dialogue_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "dialogue", safeID + ".dialogue.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_dialogue(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_item_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "items", safeID + ".item.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_item(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_loot_table_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "loot_tables", safeID + ".loot.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_loot_table());
}

/**
 *
 * @param context
 * @param Builder
 */
export function create_manifest_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.BehaviorPack(), "manifest.json");

  const UUID1 = uuid();
  const UUID2 = uuid();
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_manifest(UUID1, UUID2));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_recipe_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "recipes", safeID + ".recipe.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_recipe(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_spawn_rule_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "spawn_rules", safeID + ".spawn.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_spawn_rule(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_trading_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "trading", safeID + ".trades.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_trading(ID));
}

/**
 *
 * @param ID
 * @param context
 * @param Builder
 */
export function create_volume_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.BehaviorPack(), "volumes", safeID + ".volume.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_volume(ID));
}
