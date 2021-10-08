import { ExecuteCommandParams } from "vscode-languageserver/node";
import { TemplateBuilder } from "./Builder";
import { GetContextCall, Context } from "./include";
import { Commands } from "../../Constants";
import { Database } from "../../Database/include";
import { Pack } from "bc-minecraft-bedrock-project";
import { GetContext } from "./Context";
import { Fs } from "../../Code/Url";
import path from "path";
import { readFileSync } from "fs";
import { Templates } from "../../Data/include";
import { TemplateProcessor } from './Processor';

/**Executes the given creation command */
export function Create(params: ExecuteCommandParams): void {
  const command = params.command;
  const context = GetContext(params);

  //Check if custom template
  const fallback = templateData[command];
  const Builder = new TemplateBuilder();

  if (fallback) {
    const filepath = getFilepath(command, context, fallback);
    const content = getContent(command, context, fallback);

    const data = (params.arguments ? params.arguments[0] : undefined);
    const processor = new TemplateProcessor(data);

    //TODO behaviourpaclk / resourcepack / world?//??? root folder

    Builder.CreateFile(processor.process(filepath), processor.process(content));
    Builder.Send();
    return;
  }

  switch (command) {
    case Commands.Create.Behaviorpack.Languages:
      //TODO
      break;

    case Commands.Create.General.Entity:
      /* = (params: ExecuteCommandParams) => {
      FunctionWithID(params, Templates.Behavior_Pack.create_entity_file);
      FunctionWithID(params, Templates.Resource_Pack.create_entity_file);
    };*/
      //TODO
      break;

    case Commands.Create.General.Languages:
      //TODO
      //CreateAll(params, Templates.Language.create_language_files);
      break;

    case Commands.Create.General.Manifests:
      //TODO
      /* = (params: ExecuteCommandParams) => {
        Function(params, Templates.Behavior_Pack.create_manifest_file);
        Function(params, Templates.Resource_Pack.create_manifest_file);
        Function(params, Templates.World.create_manifest_file);
      };*/

    case Commands.Create.Project.WorldProject] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Project.create_world_project);
    case Commands.Create.Project.Resourcepack] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Project.create_resourcepack);
    case Commands.Create.Project.Behaviorpack] = (params: ExecuteCommandParams) => FunctionWithID(params, Templates.Project.create_behaviorpack);
      Commands.Create.Resourcepack.Languages;

      [Commands.Create.Resourcepack.Texture_List]: {
        Template: Templates.Resource_Pack.animation_controller,
        Filename: "${{safeid}}.controller.json",
        Folder: "animation_controllers",
      },

      Out[Commands.Create.World.Languages] = (params: ExecuteCommandParams) => FunctionWP(params, Templates.Language.create_language_files);
      Out[Commands.Create.World.Manifests] = (params: ExecuteCommandParams) => Function(params, Templates.World.create_manifest_file);
  }
}

/**
 *
 * @param command
 * @param context
 * @param fallback
 */
function getFilepath(command: string, context: Context, fallback: ItemFunction) {
  const lookup = command.replace("bc-create-", "").replace(/-/gi, ".") + ".filename";

  const ws = context.WorkSpace();
  const data = Database.WorkspaceData.getProject(ws);
  const reference = data.attributes[lookup];

  if (typeof reference === "string") {
    return reference;
  }

  if (fallback) return fallback.Filename;

  throw new Error("Cannot find filename data for requrest: " + command);
}

/**
 *
 * @param command
 * @param context
 * @param fallback
 * @returns
 */
function getContent(command: string, context: Context, fallback: ItemFunction | undefined): string {
  const lookup = command.replace("bc-create-", "").replace(/-/gi, ".") + ".template";

  const ws = context.WorkSpace();
  const data = Database.WorkspaceData.getProject(ws);
  const reference = data.attributes[lookup];

  if (typeof reference === "string") {
    const filepath = path.resolve(Fs.FromVscode(ws), reference);

    return readFileSync(filepath).toString();
  }

  if (fallback) return fallback.Template;

  throw new Error("Cannot find template data for requrest: " + command);
}

//
interface ItemFunction {
  readonly Template: string;
  readonly Filename: string;
  readonly Folder: string;
}

//Data
const templateData: { [key: string]: ItemFunction } = {
  //Behavior
  [Commands.Create.Behaviorpack.Animation_Controller]: {
    Template: Templates.Behavior_Pack.animation_controller,
    Filename: "${{safeid}}.controller.json",
    Folder: "animation_controllers",
  },
  [Commands.Create.Behaviorpack.Animation]: {
    Template: Templates.Behavior_Pack.animation,
    Filename: "${{safeid}}.animation.json",
    Folder: "animations",
  },
  [Commands.Create.Behaviorpack.Block]: {
    Template: Templates.Behavior_Pack.block,
    Filename: "${{safeid}}.block.json",
    Folder: "blocks",
  },
  [Commands.Create.Behaviorpack.Entity]: {
    Template: Templates.Behavior_Pack.entity,
    Filename: "${{safeid}}.block.json",
    Folder: "entities",
  },
  [Commands.Create.Behaviorpack.Dialogue]: {
    Template: Templates.Behavior_Pack.dialogue,
    Filename: "${{safeid}}.dialogue.json",
    Folder: "dialogue",
  },
  [Commands.Create.Behaviorpack.Item]: {
    Template: Templates.Behavior_Pack.item,
    Filename: "${{safeid}}.item.json",
    Folder: "items",
  },
  [Commands.Create.Behaviorpack.Loot_Table]: {
    Template: Templates.Behavior_Pack.loot_table,
    Filename: "${{safeid}}.loot.json",
    Folder: "loot_tables",
  },
  [Commands.Create.Behaviorpack.Manifests]: {
    Template: Templates.Behavior_Pack.manifest,
    Filename: "manifest.json",
    Folder: "",
  },
  [Commands.Create.Behaviorpack.Recipe]: {
    Template: Templates.Behavior_Pack.recipe,
    Filename: "${{safeid}}.recipe.json",
    Folder: "recipes",
  },
  [Commands.Create.Behaviorpack.Spawn_Rule]: {
    Template: Templates.Behavior_Pack.spawn_rule,
    Filename: "${{safeid}}.spawn.json",
    Folder: "spawn_rules",
  },
  [Commands.Create.Behaviorpack.Trading]: {
    Template: Templates.Behavior_Pack.trading,
    Filename: "${{safeid}}.trades.json",
    Folder: "trading",
  },
  [Commands.Create.Behaviorpack.Volume]: {
    Template: Templates.Behavior_Pack.volume,
    Filename: "${{safeid}}.volume.json",
    Folder: "volumes",
  },

  //ResourcePack
  [Commands.Create.Resourcepack.Animation_Controller]: {
    Template: Templates.Resource_Pack.animation_controller,
    Filename: "${{safeid}}.controller.json",
    Folder: "animation_controllers",
  },
  [Commands.Create.Resourcepack.Animation]: {
    Template: Templates.Resource_Pack.animation,
    Filename: "${{safeid}}.animation.json",
    Folder: "animations",
  },
  [Commands.Create.Resourcepack.Attachable]: {
    Template: Templates.Resource_Pack.attachable,
    Filename: "${{safeid}}.json",
    Folder: "attachables",
  },
  [Commands.Create.Resourcepack.Biomes_Client]: {
    Template: Templates.Resource_Pack.biomes_client,
    Filename: "biomes_client.json",
    Folder: "",
  },
  [Commands.Create.Resourcepack.Blocks]: {
    Template: Templates.Resource_Pack.blocks,
    Filename: "blocks.json",
    Folder: "",
  },
  [Commands.Create.Resourcepack.Entity]: {
    Template: Templates.Resource_Pack.entity,
    Filename: "${{safeid}}.entity.json",
    Folder: "entity",
  },
  [Commands.Create.Resourcepack.Flipbook_Textures]: {
    Template: Templates.Resource_Pack.flipbook_textures,
    Filename: "flipbook_textures.json",
    Folder: "textures",
  },
  [Commands.Create.Resourcepack.Fog]: {
    Template: Templates.Resource_Pack.fog,
    Filename: "${{safeid}}.fog.json",
    Folder: "fogs",
  },
  [Commands.Create.Resourcepack.Item_Texture]: {
    Template: Templates.Resource_Pack.item_texture,
    Filename: "item_texture.json",
    Folder: "textures",
  },
  [Commands.Create.Resourcepack.Manifests]: {
    Template: Templates.Resource_Pack.manifest,
    Filename: "manifest.json",
    Folder: "",
  },
  [Commands.Create.Resourcepack.Model]: {
    Template: Templates.Resource_Pack.model,
    Filename: "${{safeid}}.geo.json",
    Folder: "models/entity",
  },
  [Commands.Create.Resourcepack.Music_Definitions]: {
    Template: Templates.Resource_Pack.music_definitions,
    Filename: "music_definitions.json",
    Folder: "sounds",
  },
  [Commands.Create.Resourcepack.Particle]: {
    Template: Templates.Resource_Pack.particle,
    Filename: "${{safeid}}.particle.json",
    Folder: "particles",
  },
  [Commands.Create.Resourcepack.Render_Controller]: {
    Template: Templates.Resource_Pack.render_controller,
    Filename: "${{safeid}}.render.json",
    Folder: "render_controllers",
  },
  [Commands.Create.Resourcepack.Sounds]: {
    Template: Templates.Resource_Pack.sounds,
    Filename: "sounds.json",
    Folder: "",
  },
  [Commands.Create.Resourcepack.Sound_Definitions]: {
    Template: Templates.Resource_Pack.sound_definitions,
    Filename: "sound_definitions.json",
    Folder: "sounds",
  },
  [Commands.Create.Resourcepack.Terrain_Texture]: {
    Template: Templates.Resource_Pack.terrain_texture,
    Filename: "texture_list.json",
    Folder: "textures",
  },

  //World
  [Commands.Create.World.Manifests] : {
    Template: Templates.World.manifest,
    Filename: "manifest.json",
    Folder: "",
  }
};

const templateFunctions: {[key : string] : (builder : TemplateBuilder, processor : TemplateProcessor) => void} = {

}

/**
 *
 * @param params
 * @param callback
 */
function FunctionWithID(params: ExecuteCommandParams, callback: (ID: string, context: Context, Builder: TemplateBuilder) => void): void {
  GetContextCall(params, (context: Context, params: ExecuteCommandParams) => {
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
  GetContextCall(params, (context: Context, params: ExecuteCommandParams) => {
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
  GetContextCall(params, (context: Context, params: ExecuteCommandParams) => {
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
  GetContextCall(params, (context: Context, params: ExecuteCommandParams) => {
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
function Function(params: ExecuteCommandParams, callback: (context: Context, Builder: TemplateBuilder) => void): void {
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
