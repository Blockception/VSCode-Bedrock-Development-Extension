import { Templates } from "../../../Data/include";
import { SafeIDNoNamespace } from "../../../Data/Templates/Function";
import { TemplateBuilder } from "../Builder";
import * as path from "path";
import { context } from "../Context";
import { GetDocuments } from "../../../Types/Document/include";

const { v4: uuid } = require("uuid");

export function create_animation_controller_file(ID: string, context: context, Builder: TemplateBuilder): void {
  ID = ID.replace("controller.", "");
  ID = ID.replace("animation.", "");

  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.ResourcePack(), "animation_controllers", safeID + ".controller.json");

  Builder.CreateFile(uri, Templates.Resource_Pack.create_animation_controller(ID));
}

export function create_animation_file(ID: string, context: context, Builder: TemplateBuilder): void {
  ID = ID.replace("animation.", "");

  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.ResourcePack(), "animations", safeID + ".animation.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_animation(ID));
}

export function create_attachable_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.ResourcePack(), "attachables", safeID + ".json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_attachable(ID));
}

export function create_biomes_client_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "biomes_client.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_biomes_client());
}

export function create_blocks_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "blocks.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_blocks());
}

export function create_entity_file(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.ResourcePack(), "entity", safeID + ".entity.json");

  Builder.CreateFile(uri, Templates.Resource_Pack.create_entity(ID));
}

export function create_flipbook_textures_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "textures", "flipbook_textures.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_flipbook_textures());
}

export function create_fog(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.ResourcePack(), "fogs", safeID + ".fog.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_fog(ID));
}

export function create_item_texture_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "textures", "item_texture.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_item_texture());
}

export function create_manifest_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "manifest.json");
  const UUID1 = uuid();
  const UUID2 = uuid();
  Builder.CreateFile(uri, Templates.Resource_Pack.create_manifest(UUID1, UUID2));
}

export function create_model_file(ID: string, context: context, Builder: TemplateBuilder): void {
  if (!(ID.startsWith("geometry.") || ID.startsWith("Geometry."))) ID = "geometry." + ID;

  const safeID = SafeIDNoNamespace(ID).replace("geometry.", "");
  const uri = path.join(context.ResourcePack(), "models/entity", safeID + ".geo.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_model(ID));
}

export function create_music_definitions_File(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "sounds", "music_definitions.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_music_definitions());
}

export function create_particle_File(ID: string, context: context, Builder: TemplateBuilder): void {
  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.ResourcePack(), "particles", safeID + ".particle.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_particle(ID));
}

export function create_render_controller_File(ID: string, context: context, Builder: TemplateBuilder): void {
  ID = ID.replace("controller.", "");
  ID = ID.replace("render.", "");

  const safeID = SafeIDNoNamespace(ID);
  const uri = path.join(context.ResourcePack(), "render_controllers", safeID + ".render.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_render_controller(ID));
}

export function create_sounds_File(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "sounds.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_sounds());
}

export function create_sound_definitions_File(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "sounds", "sound_definitions.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_sound_definitions());
}

export function create_terrain_texture_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "textures", "terrain_texture.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_terrain_texture());
}

export function create_texture_list_file(context: context, Builder: TemplateBuilder): void {
  const uri = path.join(context.ResourcePack(), "textures", "texture_list.json");

  const Textures = GetDocuments(context.ResourcePack() + "textures/", ["**/*.png", "**/*.tga"]);

  for (let I = 0; I < Textures.length; I++) {
    let Texture = Textures[I];

    let Index = Texture.indexOf("/textures/");

    if (Index > -1) Texture = Texture.substring(Index + 1, Texture.length);

    Index = Texture.lastIndexOf(".");

    if (Index > -1) {
      Texture = Texture.substring(0, Index);
    }

    Textures[I] = Texture;
  }

  Builder.CreateFile(uri, JSON.stringify(Textures));
}
