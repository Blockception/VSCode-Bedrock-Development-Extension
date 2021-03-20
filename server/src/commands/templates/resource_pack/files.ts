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
import { Templates } from "../../../data/include";
import { SafeIDNoNamespace } from "../../../data/Templates/Function";
import { TemplateBuilder } from "../Builder";
import * as path from "path";
import { Context } from "../Context";
import { uuid } from "uuidv4";
import { GetDocuments } from "../../../Code/include";

export function create_animation_controller_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "animation_controllers", safeID + ".controller.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_animation_controller(ID));
}

export function create_animation_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "animations", safeID + ".animation.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_animation(ID));
}

export function create_attachable_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "attachables", safeID + ".json");
  Builder.CreateFile(uri, Templates.resource_pack.create_attachable(ID));
}

export function create_biomes_client_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "biomes_client.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_biomes_client());
}

export function create_blocks_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "blocks.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_blocks());
}

export function create_entity_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "entity", safeID + ".entity.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_entity(ID));
}

export function create_flipbook_textures_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "textures", "flipbook_textures.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_flipbook_textures());
}

export function create_fog(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "fogs", safeID + ".fog.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_fog(ID));
}

export function create_item_texture_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "textures", "item_texture.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_item_texture());
}

export function create_manifest_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "manifest.json");
  let UUID1 = uuid();
  let UUID2 = uuid();
  Builder.CreateFile(uri, Templates.resource_pack.create_manifest(UUID1, UUID2));
}

export function create_model_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  if (!(ID.startsWith("geometry.") || ID.startsWith("Geometry."))) ID = "geometry." + ID;

  let safeID = SafeIDNoNamespace(ID).replace("geometry.", "");
  let uri = path.join(Context.ResourcePack, "models/entities", safeID + ".geo.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_model(ID));
}

export function create_music_definitions_File(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "sounds", "music_definitions.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_music_definitions());
}

export function create_particle_File(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "particles", safeID + ".particle.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_particle(ID));
}

export function create_render_controller_File(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "render_controllers", safeID + ".render_controller.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_render_controller(ID));
}

export function create_sounds_File(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "sounds.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_sounds());
}

export function create_sound_definitions_File(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "sounds", "sound_definitions.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_sound_definitions());
}

export function create_terrain_texture_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "textures", "terrain_texture.json");
  Builder.CreateFile(uri, Templates.resource_pack.create_terrain_texture());
}

export function create_texture_list_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "textures", "texture_list.json");

  let Textures = GetDocuments(Context.ResourcePack + "textures/", ["**/*.png", "**/*.tga"]);

  for (let I = 0; I < Textures.length; I++) {
    var Texture = Textures[I];
    Texture = Texture.replace(Context.ResourcePack, "");
    let Index = Texture.lastIndexOf(".");

    if (Index > -1) {
      Texture = Texture.substring(0, Index);
    }

    Textures[I] = Texture;
  }

  Builder.CreateFile(uri, JSON.stringify(Textures));
}
