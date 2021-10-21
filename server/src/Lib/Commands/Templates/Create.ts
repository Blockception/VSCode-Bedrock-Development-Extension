import { ExecuteCommandParams } from "vscode-languageserver/node";
import { TemplateBuilder } from "./Builder";
import { Console } from "../../Manager/Console";
import { Commands } from "../../Constants";
import { Database } from "../../Database/Database";
import { Pack } from "bc-minecraft-bedrock-project";
import { GetContextCall, context } from "./Context";

import * as BehaviorPack from "./BehaviorPack/include";
import * as ResourcePack from "./ResourcePack/include";
import * as Language from "./Language/include";
import * as World from "./World/include";
import * as Project from "./Project/include";

type CommandManager = { [id: string]: (args: ExecuteCommandParams) => void | undefined };
const CreationCommands: CommandManager = Initialize();

/**Executes the given creation command */
export function Create(params: ExecuteCommandParams): void {
  const Data = CreationCommands[params.command];

  if (Data) {
    Data(params);
  } else {
    Console.Error("Unknown creation command: " + params.command);
  }
}

function Initialize(): CommandManager {
  const Out: CommandManager = {};

  //General
  Out[Commands.Create.General.Entity] = (params: ExecuteCommandParams) => {
    FunctionWithID(params, BehaviorPack.create_entity_file);
    FunctionWithID(params, ResourcePack.create_entity_file);
  };
  Out[Commands.Create.General.Languages] = (params: ExecuteCommandParams) => {
    CreateAll(params, Language.create_language_files);
  };
  Out[Commands.Create.General.Manifests] = (params: ExecuteCommandParams) => {
    Function(params, BehaviorPack.create_manifest_file);
    Function(params, ResourcePack.create_manifest_file);
    Function(params, World.create_manifest_file);
  };

  //Project
  Out[Commands.Create.Project.WorldProject] = (params: ExecuteCommandParams) => FunctionWithID(params, Project.create_world_project);
  Out[Commands.Create.Project.Resourcepack] = (params: ExecuteCommandParams) => FunctionWithID(params, Project.create_resourcepack);
  Out[Commands.Create.Project.Behaviorpack] = (params: ExecuteCommandParams) => FunctionWithID(params, Project.create_behaviorpack);

  //Behavior pack
  Out[Commands.Create.Behaviorpack.Animation_Controller] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, BehaviorPack.create_animation_controller_file);
  Out[Commands.Create.Behaviorpack.Animation] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_animation_file);
  Out[Commands.Create.Behaviorpack.Block] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_block_file);
  Out[Commands.Create.Behaviorpack.Entity] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_entity_file);
  Out[Commands.Create.Behaviorpack.Dialogue] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_dialogue_file);
  Out[Commands.Create.Behaviorpack.Item] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_item_file);
  Out[Commands.Create.Behaviorpack.Languages] = (params: ExecuteCommandParams) => FunctionBP(params, Language.create_language_files);
  Out[Commands.Create.Behaviorpack.Loot_Table] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_loot_table_file);
  Out[Commands.Create.Behaviorpack.Manifests] = (params: ExecuteCommandParams) => Function(params, BehaviorPack.create_manifest_file);
  Out[Commands.Create.Behaviorpack.Recipe] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_recipe_file);
  Out[Commands.Create.Behaviorpack.Spawn_Rule] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_spawn_rule_file);
  Out[Commands.Create.Behaviorpack.Trading] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_trading_file);
  Out[Commands.Create.Behaviorpack.Volume] = (params: ExecuteCommandParams) => FunctionWithID(params, BehaviorPack.create_volume_file);

  //Resource pack
  Out[Commands.Create.Resourcepack.Animation_Controller] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, ResourcePack.create_animation_controller_file);
  Out[Commands.Create.Resourcepack.Animation] = (params: ExecuteCommandParams) => FunctionWithID(params, ResourcePack.create_animation_file);
  Out[Commands.Create.Resourcepack.Attachable] = (params: ExecuteCommandParams) => FunctionWithID(params, ResourcePack.create_attachable_file);
  Out[Commands.Create.Resourcepack.Biomes_Client] = (params: ExecuteCommandParams) => Function(params, ResourcePack.create_biomes_client_file);
  Out[Commands.Create.Resourcepack.Blocks] = (params: ExecuteCommandParams) => Function(params, ResourcePack.create_blocks_file);
  Out[Commands.Create.Resourcepack.Entity] = (params: ExecuteCommandParams) => FunctionWithID(params, ResourcePack.create_entity_file);
  Out[Commands.Create.Resourcepack.Flipbook_Textures] = (params: ExecuteCommandParams) =>
    Function(params, ResourcePack.create_flipbook_textures_file);
  Out[Commands.Create.Resourcepack.Fog] = (params: ExecuteCommandParams) => FunctionWithID(params, ResourcePack.create_fog);
  Out[Commands.Create.Resourcepack.Languages] = (params: ExecuteCommandParams) => FunctionRP(params, Language.create_language_files);
  Out[Commands.Create.Resourcepack.Item_Texture] = (params: ExecuteCommandParams) => Function(params, ResourcePack.create_item_texture_file);
  Out[Commands.Create.Resourcepack.Manifests] = (params: ExecuteCommandParams) => Function(params, ResourcePack.create_manifest_file);
  Out[Commands.Create.Resourcepack.Model] = (params: ExecuteCommandParams) => FunctionWithID(params, ResourcePack.create_model_file);
  Out[Commands.Create.Resourcepack.Music_Definitions] = (params: ExecuteCommandParams) =>
    Function(params, ResourcePack.create_music_definitions_File);
  Out[Commands.Create.Resourcepack.Particle] = (params: ExecuteCommandParams) => FunctionWithID(params, ResourcePack.create_particle_File);
  Out[Commands.Create.Resourcepack.Render_Controller] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, ResourcePack.create_render_controller_File);
  Out[Commands.Create.Resourcepack.Sounds] = (params: ExecuteCommandParams) => Function(params, ResourcePack.create_sounds_File);
  Out[Commands.Create.Resourcepack.Sound_Definitions] = (params: ExecuteCommandParams) =>
    Function(params, ResourcePack.create_sound_definitions_File);
  Out[Commands.Create.Resourcepack.Terrain_Texture] = (params: ExecuteCommandParams) => Function(params, ResourcePack.create_terrain_texture_file);
  Out[Commands.Create.Resourcepack.Texture_List] = (params: ExecuteCommandParams) => Function(params, ResourcePack.create_texture_list_file);

  //World
  Out[Commands.Create.World.Languages] = (params: ExecuteCommandParams) => FunctionWP(params, Language.create_language_files);
  Out[Commands.Create.World.Manifests] = (params: ExecuteCommandParams) => Function(params, World.create_manifest_file);

  return Out;
}

/**
 *
 * @param params
 * @param callback
 */
function FunctionWithID(params: ExecuteCommandParams, callback: (ID: string, context: context, Builder: TemplateBuilder) => void): void {
  GetContextCall(params, (context: context, params: ExecuteCommandParams) => {
    const IDs = params.arguments;
    if (!IDs) return;
    if (!context) return;

    const Builder = new TemplateBuilder();

    //Last is reserved for the document
    for (let I = 0; I < IDs.length - 1; I++) {
      callback(IDs[I], context, Builder);
    }

    Builder.Send();
  });
}

/**
 *
 * @param params
 * @param callback
 */
function FunctionBP(params: ExecuteCommandParams, callback: (Folder: string, Builder: TemplateBuilder) => void): void {
  GetContextCall(params, (context: context, params: ExecuteCommandParams) => {
    if (!context) return;

    const Builder = new TemplateBuilder();

    callback(context.BehaviorPack(), Builder);

    Builder.Send();
  });
}

/**
 *
 * @param params
 * @param callback
 */
function FunctionRP(params: ExecuteCommandParams, callback: (Folder: string, Builder: TemplateBuilder) => void): void {
  GetContextCall(params, (context: context, params: ExecuteCommandParams) => {
    if (!context) return;

    const Builder = new TemplateBuilder();

    callback(context.ResourcePack(), Builder);

    Builder.Send();
  });
}

/**
 *
 * @param params
 * @param callback
 */
function FunctionWP(params: ExecuteCommandParams, callback: (Folder: string, Builder: TemplateBuilder) => void): void {
  GetContextCall(params, (context: context, params: ExecuteCommandParams) => {
    if (!context) return;

    const Builder = new TemplateBuilder();

    callback(context.ResourcePack(), Builder);

    Builder.Send();
  });
}

/**
 *
 * @param params
 * @param callback
 */
function Function(params: ExecuteCommandParams, callback: (context: context, Builder: TemplateBuilder) => void): void {
  GetContextCall(params, (context, params) => {
    if (!context) return;

    const Builder = new TemplateBuilder();

    callback(context, Builder);

    Builder.Send();
  });
}

function CreateAll(params: ExecuteCommandParams, callback: (Folder: Pack, Builder: TemplateBuilder) => void) {
  const Builder = new TemplateBuilder();

  Database.ProjectData.BehaviorPacks.packs.forEach((pack) => callback(pack, Builder));
  Database.ProjectData.ResourcePacks.packs.forEach((pack) => callback(pack, Builder));
  Database.ProjectData.Worlds.packs.forEach((pack) => callback(pack, Builder));

  Builder.Send();
}
