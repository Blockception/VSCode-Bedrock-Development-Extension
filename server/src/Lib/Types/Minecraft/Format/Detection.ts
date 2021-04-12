import { GetFilename } from "../../../Code/include";
import { DataType } from "./Data Type";
import { GeneralDataType } from "./General Data Type";

/**
 * Detects the type of data from the given uri
 * @param uri
 */
export function DetectDataType(uri: string): DataType {
  uri = decodeURI(uri);

  if (uri.includes("\\behavior_packs\\")) {
    return DetectBehaviorType(uri);
  }

  if (uri.includes("\\resource_packs\\")) {
    return DetectResourceType(uri);
  }

  let Match = uri.match(/\\.*(BP|bp).*\\/);

  if (Match) return DetectBehaviorType(uri);

  Match = uri.match(/\\.*(RP|rp).*\\/);

  if (Match) return DetectResourceType(uri);

  if (uri.includes("manifest.json")) return DataType.world_manifest;

  return DataType.unknown;
}

/**
 *
 * @param uri
 */
export function DetectGeneralDataType(uri: string): GeneralDataType {
  uri = decodeURI(uri);

  if (uri.includes("behavior_packs") || uri.includes("Behavior_Pack") || uri.includes("behavior pack") || uri.includes("Behavior Pack")) {
    return GeneralDataType.behaviour_pack;
  }

  if (uri.includes("resource_packs") || uri.includes("Resource_Pack") || uri.includes("resource pack") || uri.includes("Resource Pack")) {
    return GeneralDataType.resource_pack;
  }

  let Match = uri.match(/\\.*(BP|bp).*\\/);
  if (Match) return GeneralDataType.behaviour_pack;

  Match = uri.match(/\\.*(RP|rp).*\\/);
  if (Match) return GeneralDataType.resource_pack;

  Match = uri.match(/\\.*(WP|wp).*\\/);
  if (Match) return GeneralDataType.world;

  return GeneralDataType.unknown;
}

/**
 * Detects behaviour pack resource, already assumed the path belongs to a behaviour pack
 * @param uri the decoded uri
 */
export function DetectBehaviorType(uri: string): DataType {
  if (uri.endsWith(".mcfunction")) return DataType.behaviour_function;

  //Folders
  if (uri.includes("\\loot_tables\\")) return DataType.behaviour_loot_table;
  if (uri.includes("\\animation_controllers\\")) return DataType.behaviour_animation_controller;
  if (uri.includes("\\animations\\")) return DataType.behaviour_animation;
  if (uri.includes("\\blocks\\")) return DataType.behaviour_block;
  if (uri.includes("\\entities\\")) return DataType.behaviour_entity;
  if (uri.includes("\\functions\\")) return DataType.behaviour_function;
  if (uri.includes("\\items\\")) return DataType.behaviour_item;
  if (uri.includes("\\scripts\\")) return DataType.behaviour_script;
  if (uri.includes("\\spawn_rules\\")) return DataType.behaviour_spawn_rules;
  if (uri.includes("\\trading\\")) return DataType.behaviour_trade;

  //Files
  if (uri.includes("manifest.json")) return DataType.behaviour_manifest;

  return DataType.unknown;
}

/**
 * Detects resource pack resource, already assumed the path belongs to a resource pack
 * @param uri the decoded uri
 */
export function DetectResourceType(uri: string): DataType {
  //Folders
  if (uri.includes("\\animation_controllers\\")) return DataType.resource_animation_controller;
  if (uri.includes("\\animations\\")) return DataType.resource_animation;
  if (uri.includes("\\attachables\\")) return DataType.resource_attachable;
  if (uri.includes("\\models\\entity\\")) return DataType.resource_entity_model;
  if (uri.includes("\\models\\entities\\")) return DataType.resource_entity_model;
  if (uri.includes("\\entity\\")) return DataType.resource_entity;
  if (uri.includes("\\particles\\")) return DataType.resource_particle;
  if (uri.includes("\\render_controllers\\")) return DataType.resource_render_controller;

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
