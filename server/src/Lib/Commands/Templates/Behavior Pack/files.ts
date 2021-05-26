import { Templates } from "../../../Data/include";
import { SafeIDNoNamespace } from "../../../Data/Templates/Function";
import { TemplateBuilder } from "../Builder";
import * as path from "path";
import { Context } from "../Context";
import { uuid } from "uuidv4";

export function create_animation_controller_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(Context.BehaviorPack, "animation_controllers", safeID + ".controller.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_animation_controller(ID));
}

export function create_animation_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(Context.BehaviorPack, "animations", safeID + ".animation.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_animation(ID));
}

export function create_block_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "blocks", safeID + ".block.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_block(ID));
}

export function create_entity_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "entities", safeID + ".entity.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_entity(ID));
}

export function create_item_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "items", safeID + ".item.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_item(ID));
}

export function create_loot_table_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "loot_tables", safeID + ".loot.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_loot_table());
}

export function create_manifest_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.BehaviorPack, "manifest.json");
  let UUID1 = uuid();
  let UUID2 = uuid();
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_manifest(UUID1, UUID2));
}

export function create_recipe_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "recipes", safeID + ".recipe.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_recipe(ID));
}

export function create_spawn_rule_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "spawn_rules", safeID + ".spawn.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_spawn_rule(ID));
}

export function create_trading_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.BehaviorPack, "trading", safeID + ".trades.json");
  Builder.CreateFile(uri, Templates.Behavior_Pack.create_trading(ID));
}
