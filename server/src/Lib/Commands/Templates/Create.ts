import { ExecuteCommandParams } from "vscode-languageserver/node";
import { TemplateBuilder } from "./Builder";
import { Console } from "../../Manager/Console";
import { GetContextCall, context } from './include';
import { Commands } from '../../Constants';
import { Templates } from '../include';
import { Database } from '../../Database/include';
import { Pack } from 'bc-minecraft-bedrock-project';

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
    FunctionWithID(params, Templates.Behavior_Pack.create_entity_file);
    FunctionWithID(params, Templates.Resource_Pack.create_entity_file);
  };
  Out[Commands.Create.General.Languages] = (params: ExecuteCommandParams) => {
    CreateAll(params, Templates.Language.create_language_files);
  };
  Out[Commands.Create.General.Manifests] = (params: ExecuteCommandParams) => {
    Function(params, Templates.Behavior_Pack.create_manifest_file);
    Function(params, Templates.Resource_Pack.create_manifest_file);
    Function(params, Templates.World.create_manifest_file);
  };

  //Project
  Out[Commands.Create.Project.WorldProject] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Project.create_world_project);
  Out[Commands.Create.Project.Resourcepack] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Project.create_resourcepack);
  Out[Commands.Create.Project.Behaviorpack] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Project.create_behaviorpack);

  //Behavior pack
  Out[Commands.Create.Behaviorpack.Animation_Controller] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_animation_controller_file);
  Out[Commands.Create.Behaviorpack.Animation] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_animation_file);
  Out[Commands.Create.Behaviorpack.Block] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_block_file);
  Out[Commands.Create.Behaviorpack.Entity] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_entity_file);
  Out[Commands.Create.Behaviorpack.Dialogue] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_dialogue_file);
  Out[Commands.Create.Behaviorpack.Item] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_item_file);
  Out[Commands.Create.Behaviorpack.Languages] = (params: ExecuteCommandParams) => FunctionBP(params, Templates.Language.create_language_files);
  Out[Commands.Create.Behaviorpack.Loot_Table] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_loot_table_file);
  Out[Commands.Create.Behaviorpack.Manifests] = (params: ExecuteCommandParams) => Function(params, Templates.Behavior_Pack.create_manifest_file);
  Out[Commands.Create.Behaviorpack.Recipe] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_recipe_file);
  Out[Commands.Create.Behaviorpack.Spawn_Rule] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_spawn_rule_file);
  Out[Commands.Create.Behaviorpack.Trading] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_trading_file);
  Out[Commands.Create.Behaviorpack.Volume] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_volume_file);

  //Resource pack
  Out[Commands.Create.Resourcepack.Animation_Controller] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Resource_Pack.create_animation_controller_file);
  Out[Commands.Create.Resourcepack.Animation] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Resource_Pack.create_animation_file);
  Out[Commands.Create.Resourcepack.Attachable] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Resource_Pack.create_attachable_file);
  Out[Commands.Create.Resourcepack.Biomes_Client] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_biomes_client_file);
  Out[Commands.Create.Resourcepack.Blocks] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_blocks_file);
  Out[Commands.Create.Resourcepack.Entity] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Resource_Pack.create_entity_file);
  Out[Commands.Create.Resourcepack.Flipbook_Textures] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_flipbook_textures_file);
  Out[Commands.Create.Resourcepack.Fog] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Resource_Pack.create_fog);
  Out[Commands.Create.Resourcepack.Languages] = (params: ExecuteCommandParams) => FunctionRP(params, Templates.Language.create_language_files);
  Out[Commands.Create.Resourcepack.Item_Texture] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_item_texture_file);
  Out[Commands.Create.Resourcepack.Manifests] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_manifest_file);
  Out[Commands.Create.Resourcepack.Model] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Resource_Pack.create_model_file);
  Out[Commands.Create.Resourcepack.Music_Definitions] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_music_definitions_File);
  Out[Commands.Create.Resourcepack.Particle] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Resource_Pack.create_particle_File);
  Out[Commands.Create.Resourcepack.Render_Controller] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Resource_Pack.create_render_controller_File);
  Out[Commands.Create.Resourcepack.Sounds] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_sounds_File);
  Out[Commands.Create.Resourcepack.Sound_Definitions] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_sound_definitions_File);
  Out[Commands.Create.Resourcepack.Terrain_Texture] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_terrain_texture_file);
  Out[Commands.Create.Resourcepack.Texture_List] = (params: ExecuteCommandParams) => Function(params, Templates.Resource_Pack.create_texture_list_file);

  //World
  Out[Commands.Create.World.Languages] = (params: ExecuteCommandParams) => FunctionWP(params, Templates.Language.create_language_files);
  Out[Commands.Create.World.Manifests] = (params: ExecuteCommandParams) => Function(params, Templates.World.create_manifest_file);

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

    for (let I = 0; I < IDs.length; I++) {
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
