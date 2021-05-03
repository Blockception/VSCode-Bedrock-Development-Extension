import { Templates } from "../../../Data/include";
import { SafeIDNoNamespace } from "../../../Data/Templates/Function";
import { TemplateBuilder } from "../Builder";
import * as path from "path";
import { Context } from "../Context";
import { uuid } from "uuidv4";
import { GetDocuments } from "../../../Code/include";

export function create_animation_controller_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "animation_controllers", safeID + ".controller.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_animation_controller(ID));
}

export function create_animation_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "animations", safeID + ".animation.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_animation(ID));
}

export function create_attachable_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "attachables", safeID + ".json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_attachable(ID));
}

export function create_biomes_client_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "biomes_client.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_biomes_client());
}

export function create_blocks_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "blocks.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_blocks());
}

export function create_entity_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "entity", safeID + ".entity.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_entity(ID));
}

export function create_flipbook_textures_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "textures", "flipbook_textures.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_flipbook_textures());
}

export function create_fog(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "fogs", safeID + ".fog.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_fog(ID));
}

export function create_item_texture_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "textures", "item_texture.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_item_texture());
}

export function create_manifest_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "manifest.json");
  let UUID1 = uuid();
  let UUID2 = uuid();
  Builder.CreateFile(uri, Templates.Resource_Pack.create_manifest(UUID1, UUID2));
}

export function create_model_file(ID: string, Context: Context, Builder: TemplateBuilder): void {
  if (!(ID.startsWith("geometry.") || ID.startsWith("Geometry."))) ID = "geometry." + ID;

  let safeID = SafeIDNoNamespace(ID).replace("geometry.", "");
  let uri = path.join(Context.ResourcePack, "models/entity", safeID + ".geo.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_model(ID));
}

export function create_music_definitions_File(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "sounds", "music_definitions.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_music_definitions());
}

export function create_particle_File(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "particles", safeID + ".particle.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_particle(ID));
}

export function create_render_controller_File(ID: string, Context: Context, Builder: TemplateBuilder): void {
  let safeID = SafeIDNoNamespace(ID);
  let uri = path.join(Context.ResourcePack, "render_controllers", safeID + ".render_controller.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_render_controller(ID));
}

export function create_sounds_File(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "sounds.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_sounds());
}

export function create_sound_definitions_File(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "sounds", "sound_definitions.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_sound_definitions());
}

export function create_terrain_texture_file(Context: Context, Builder: TemplateBuilder): void {
  let uri = path.join(Context.ResourcePack, "textures", "terrain_texture.json");
  Builder.CreateFile(uri, Templates.Resource_Pack.create_terrain_texture());
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
