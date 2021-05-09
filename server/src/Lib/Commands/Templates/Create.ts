import { ExecuteCommandParams } from "vscode-languageserver/node";
import { Commands } from "../../Constants";
import { TemplateBuilder } from "./Builder";
import { Context, GetContextAsync } from "./Context";
import { Templates } from "../include";
import { Console } from "../../Console/Console";
import { GetProjectFiles } from "../../Code/include";

type CommandManager = { [id: string]: (args: ExecuteCommandParams) => void | undefined };
const CreationCommands: CommandManager = Initialize();

/**Executes the given creation command */
export function Create(params: ExecuteCommandParams): void {
  let Data = CreationCommands[params.command];

  if (Data) {
    Data(params);
  } else {
    Console.Error("Unknown creation command: " + params.command);
  }
}

function Initialize(): CommandManager {
  let Out: CommandManager = {};

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
  Out[Commands.Create.Behaviorpack.Item] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_item_file);
  Out[Commands.Create.Behaviorpack.Languages] = (params: ExecuteCommandParams) => FunctionBP(params, Templates.Language.create_language_files);
  Out[Commands.Create.Behaviorpack.Loot_Table] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_loot_table_file);
  Out[Commands.Create.Behaviorpack.Manifests] = (params: ExecuteCommandParams) => Function(params, Templates.Behavior_Pack.create_manifest_file);
  Out[Commands.Create.Behaviorpack.Recipe] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_recipe_file);
  Out[Commands.Create.Behaviorpack.Spawn_Rule] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_spawn_rule_file);
  Out[Commands.Create.Behaviorpack.Trading] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Behavior_Pack.create_trading_file);

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

function FunctionWithID(params: ExecuteCommandParams, callback: (ID: string, Context: Context, Builder: TemplateBuilder) => void): void {
  GetContextAsync<ExecuteCommandParams>(params, (Context: Context, params: ExecuteCommandParams) => {
    let IDs = params.arguments;
    if (!IDs) return;
    if (!Context) return;

    let Builder = new TemplateBuilder();

    for (let I = 0; I < IDs.length; I++) {
      callback(IDs[I], Context, Builder);
    }

    Builder.Send();
  });
}

function FunctionBP(params: ExecuteCommandParams, callback: (Folder: string, Builder: TemplateBuilder) => void): void {
  GetContextAsync<ExecuteCommandParams>(params, (Context: Context, params: ExecuteCommandParams) => {
    if (!Context) return;

    let Builder = new TemplateBuilder();

    callback(Context.BehaviorPack, Builder);

    Builder.Send();
  });
}

function FunctionRP(params: ExecuteCommandParams, callback: (Folder: string, Builder: TemplateBuilder) => void): void {
  GetContextAsync<ExecuteCommandParams>(params, (Context: Context, params: ExecuteCommandParams) => {
    if (!Context) return;

    let Builder = new TemplateBuilder();

    callback(Context.ResourcePack, Builder);

    Builder.Send();
  });
}

function FunctionWP(params: ExecuteCommandParams, callback: (Folder: string, Builder: TemplateBuilder) => void): void {
  GetContextAsync<ExecuteCommandParams>(params, (Context: Context, params: ExecuteCommandParams) => {
    if (!Context) return;

    let Builder = new TemplateBuilder();

    callback(Context.ResourcePack, Builder);

    Builder.Send();
  });
}

function Function(params: ExecuteCommandParams, callback: (Context: Context, Builder: TemplateBuilder) => void): void {
  GetContextAsync<ExecuteCommandParams>(params, (Context: Context, params: ExecuteCommandParams) => {
    if (!Context) return;

    let Builder = new TemplateBuilder();

    callback(Context, Builder);

    Builder.Send();
  });
}

function CreateAll(params: ExecuteCommandParams, callback: (Folder: string, Builder: TemplateBuilder) => void) {
  GetProjectFiles().then((data) => {
    if (!data) return;

    let Builder = new TemplateBuilder();

    data.BehaviourPackFolders.forEach((Folder) => callback(Folder, Builder));
    data.ResourcePackFolders.forEach((Folder) => callback(Folder, Builder));
    data.WorldFolders.forEach((Folder) => callback(Folder, Builder));

    Builder.Send();
  });
}
