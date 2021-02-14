/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { ExecuteCommandParams } from "vscode-languageserver/node";
import { Commands } from "../../Constants";
import { TemplateBuilder } from "./Builder";
import { Context, GetContext, GetContextAsync } from "./Context";
import { templates } from "../include";
import { Console } from "../../console/Console";

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
    FunctionWithID(params, templates.behavior_pack.create_entity_file);
    FunctionWithID(params, templates.resource_pack.create_entity_file);
  };
  Out[Commands.Create.General.Languages] = (params: ExecuteCommandParams) => {
    FunctionBP(params, templates.language.create_language_files);
    FunctionRP(params, templates.language.create_language_files);
    FunctionWP(params, templates.language.create_language_files);
  };
  Out[Commands.Create.General.Manifests] = (params: ExecuteCommandParams) => {
    Function(params, templates.behavior_pack.create_manifest_file);
    Function(params, templates.resource_pack.create_manifest_file);
    Function(params, templates.world.create_manifest_file);
  };

  //Project
  Out[Commands.Create.Project.WorldProject] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.project.create_world_project);
  Out[Commands.Create.Project.Resourcepack] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.project.create_resourcepack);
  Out[Commands.Create.Project.Behaviorpack] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.project.create_behaviorpack);

  //Behavior pack
  Out[Commands.Create.Behaviorpack.Animation_Controller] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, templates.behavior_pack.create_animation_controller_file);
  Out[Commands.Create.Behaviorpack.Animation] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, templates.behavior_pack.create_animation_file);
  Out[Commands.Create.Behaviorpack.Block] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.behavior_pack.create_block_file);
  Out[Commands.Create.Behaviorpack.Entity] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.behavior_pack.create_entity_file);
  Out[Commands.Create.Behaviorpack.Item] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.behavior_pack.create_item_file);
  Out[Commands.Create.Behaviorpack.Languages] = (params: ExecuteCommandParams) => FunctionBP(params, templates.language.create_language_files);
  Out[Commands.Create.Behaviorpack.Loot_Table] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, templates.behavior_pack.create_loot_table_file);
  Out[Commands.Create.Behaviorpack.Manifests] = (params: ExecuteCommandParams) => Function(params, templates.behavior_pack.create_manifest_file);
  Out[Commands.Create.Behaviorpack.Recipe] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.behavior_pack.create_recipe_file);
  Out[Commands.Create.Behaviorpack.Spawn_Rule] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, templates.behavior_pack.create_spawn_rule_file);
  Out[Commands.Create.Behaviorpack.Trading] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.behavior_pack.create_trading_file);

  //Resource pack
  Out[Commands.Create.Resourcepack.Animation_Controller] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, templates.resource_pack.create_animation_controller_file);
  Out[Commands.Create.Resourcepack.Animation] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, templates.resource_pack.create_animation_file);
  Out[Commands.Create.Resourcepack.Attachable] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, templates.resource_pack.create_attachable_file);
  Out[Commands.Create.Resourcepack.Biomes_Client] = (params: ExecuteCommandParams) =>
    Function(params, templates.resource_pack.create_biomes_client_file);
  Out[Commands.Create.Resourcepack.Blocks] = (params: ExecuteCommandParams) => Function(params, templates.resource_pack.create_blocks_file);
  Out[Commands.Create.Resourcepack.Entity] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.resource_pack.create_entity_file);
  Out[Commands.Create.Resourcepack.Flipbook_Textures] = (params: ExecuteCommandParams) =>
    Function(params, templates.resource_pack.create_flipbook_textures_file);
  Out[Commands.Create.Resourcepack.Fog] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.resource_pack.create_fog);
  Out[Commands.Create.Resourcepack.Languages] = (params: ExecuteCommandParams) => FunctionRP(params, templates.language.create_language_files);
  Out[Commands.Create.Resourcepack.Item_Texture] = (params: ExecuteCommandParams) =>
    Function(params, templates.resource_pack.create_item_texture_file);
  Out[Commands.Create.Resourcepack.Manifests] = (params: ExecuteCommandParams) => Function(params, templates.resource_pack.create_manifest_file);
  Out[Commands.Create.Resourcepack.Model] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.resource_pack.create_model_file);
  Out[Commands.Create.Resourcepack.Music_Definitions] = (params: ExecuteCommandParams) =>
    Function(params, templates.resource_pack.create_music_definitions_File);
  Out[Commands.Create.Resourcepack.Particle] = (params: ExecuteCommandParams) => FunctionWithID(params, templates.resource_pack.create_particle_File);
  Out[Commands.Create.Resourcepack.Render_Controller] = (params: ExecuteCommandParams) =>
    FunctionWithID(params, templates.resource_pack.create_render_controller_File);
  Out[Commands.Create.Resourcepack.Sounds] = (params: ExecuteCommandParams) => Function(params, templates.resource_pack.create_sounds_File);
  Out[Commands.Create.Resourcepack.Sound_Definitions] = (params: ExecuteCommandParams) =>
    Function(params, templates.resource_pack.create_sound_definitions_File);
  Out[Commands.Create.Resourcepack.Terrain_Texture] = (params: ExecuteCommandParams) =>
    Function(params, templates.resource_pack.create_terrain_texture_file);
  Out[Commands.Create.Resourcepack.Texture_List] = (params: ExecuteCommandParams) =>
    Function(params, templates.resource_pack.create_texture_list_file);

  //World
  Out[Commands.Create.World.Languages] = (params: ExecuteCommandParams) => FunctionWP(params, templates.language.create_language_files);
  Out[Commands.Create.World.Manifests] = (params: ExecuteCommandParams) => Function(params, templates.world.create_manifest_file);

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
