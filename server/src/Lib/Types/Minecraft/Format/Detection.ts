import { URI } from "vscode-uri";
import { GetFilename } from "../../../Code/include";
import { DataType } from "./Data Type";
import { GeneralDataType } from "./General Data Type";

/**
 * Detects the type of data from the given uri
 * @param uri
 */
export function DetectDataType(uri: string): DataType {
  if (uri.includes("/behavior_packs/")) return DetectBehaviorType(uri);
  if (uri.includes("/resource_packs/")) return DetectResourceType(uri);

  const type = DetectGeneralDataType(uri);

  switch (type) {
    case GeneralDataType.behavior_pack:
      return DetectBehaviorType(uri);

    case GeneralDataType.resource_pack:
      return DetectResourceType(uri);
  }

  if (uri.includes("manifest.json")) return DataType.world_manifest;

  return DataType.unknown;
}

/** */
export const BehaviorPackMatch: RegExp = /\/.*(behav(ior|iour)([ _-]|)pack|behav(ior|iour)|bp).*\//i;
/** */
export const ResourcePackMatch: RegExp = /\/.*(resource([ _-]|)pack|resource|rp).*\//i;
/** */
export const WorldMatch: RegExp = /\/.*(world([ _-]|)template|world|wp|db).*\//i;
/** */
export const SkinPack: RegExp = /\/.*(skin([ _-]|)pack).*\//i;

/**
 *
 * @param uri
 */
export function DetectGeneralDataType(uri: string): GeneralDataType {
  if (BehaviorPackMatch.test(uri)) return GeneralDataType.behavior_pack;
  if (ResourcePackMatch.test(uri)) return GeneralDataType.resource_pack;
  if (WorldMatch.test(uri)) return GeneralDataType.world;

  return GeneralDataType.unknown;
}

/**
 * Detects behavior pack resource, already assumed the path belongs to a behavior pack
 * @param uri the decoded uri
 */
export function DetectBehaviorType(uri: string): DataType {
  if (uri.endsWith(".mcfunction")) return DataType.behavior_function;

  //Folders
  if (uri.includes("/loot_tables/")) return DataType.behavior_loot_table;
  if (uri.includes("/animation_controllers/")) return DataType.behavior_animation_controller;
  if (uri.includes("/animations/")) return DataType.behavior_animation;
  if (uri.includes("/blocks/")) return DataType.behavior_block;
  if (uri.includes("/biomes/")) return DataType.behavior_biome;
  if (uri.includes("/dialogue/")) return DataType.behavior_dialogue;
  if (uri.includes("/entities/")) return DataType.behavior_entity;
  if (uri.includes("/feature_rules/")) return DataType.behavior_feature_rule;
  if (uri.includes("/features/")) return DataType.behavior_feature;
  if (uri.includes("/recipes/")) return DataType.behavior_recipe;
  if (uri.includes("/functions/")) return DataType.behavior_function;
  if (uri.includes("/items/")) return DataType.behavior_item;
  if (uri.includes("/scripts/")) return DataType.behavior_script;
  if (uri.includes("/structures/")) return DataType.behavior_structure;
  if (uri.includes("/spawn_rules/")) return DataType.behavior_spawn_rules;
  if (uri.includes("/trading/")) return DataType.behavior_trade;
  if (uri.includes("/texts/")) return DataType.behavior_text;
  if (uri.includes("/volumes/")) return DataType.behavior_volume;

  //Files
  if (uri.includes("manifest.json")) return DataType.behavior_manifest;

  return DataType.unknown;
}

/**
 * Detects resource pack resource, already assumed the path belongs to a resource pack
 * @param uri the decoded uri
 */
export function DetectResourceType(uri: string): DataType {
  //Folders
  if (uri.includes("/animation_controllers/")) return DataType.resource_animation_controller;
  if (uri.includes("/animations/")) return DataType.resource_animation;
  if (uri.includes("/attachables/")) return DataType.resource_attachable;
  if (uri.includes("/models/entity/")) return DataType.resource_entity_model;
  if (uri.includes("/models/entities/")) return DataType.resource_entity_model;
  if (uri.includes("/entity/")) return DataType.resource_entity;
  if (uri.includes("/particles/")) return DataType.resource_particle;
  if (uri.includes("/render_controllers/")) return DataType.resource_render_controller;

  let filename = GetFilename(uri);

  switch (filename) {
    case "biomes_client":
      return DataType.resource_biomes_client;

    case "blocks":
      return DataType.resource_blocks;

    case "flipbook_textures":
      return DataType.resource_texture_flipbook_atlas;

    case "item_texture":
      return DataType.resource_texture_item_atlas;

    case "manifest":
      return DataType.resource_manifest;

    case "music_definitions":
      return DataType.resource_music_definitions;

    case "sound_definitions":
      return DataType.resource_sounds_definitions;

    case "sounds":
      return DataType.resource_sounds;

    case "terrain_texture":
      return DataType.resource_texture_terrain_atlas;
  }

  return DataType.unknown;
}
