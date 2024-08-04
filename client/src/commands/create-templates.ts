import { commands, ExtensionContext, InputBoxOptions, Uri, window, workspace } from "vscode";
import { ExecuteCommandParams, ExecuteCommandRequest } from "vscode-languageclient";
import { Commands } from "@blockception/shared";
import { Manager } from "../manager/manager";

interface IDExample {
  ID: RegExp;
  example: string;
}

const AnimationControllerID: IDExample = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: "example.foo | example" };
const AnimationID: IDExample = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: "example.foo | example" };
const AttachableID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "namespace:attachable" };
const BlockID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "namespace:block" };
const BlockCullingRuleID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "namespace:culling_rule" };
const DialogueID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "dialogue" };
const EntityID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "namespace:entity" };
const FogID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "namespace:item" };
const ItemID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "namespace:item" };
const LootTableID: IDExample = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: "example.foo | example" };
const ModelID: IDExample = { ID: /^geometry.[0-9a-zA-Z_\\.\\-]+$/, example: "geometry.model_name" };
const ParticleID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "namespace:particle" };
const RecipeID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "namespace:recipe" };
const RenderControllerID: IDExample = { ID: /^[0-9a-zA-Z_\\.\\-]+$/, example: "" };
const SpawnRuleID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "example.foo | example" };
const TradingID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "example.foo | example" };
const VolumeID: IDExample = { ID: /^[0-9a-zA-Z:_\\.\\-]+$/, example: "example.foo | example" };

const ProjectID: IDExample = { ID: /^[A-Za-z]+$/, example: "EP" };

export function activate(context: ExtensionContext): void {
  console.log("registering create commands");

  //General
  createCommandWithID(context, Commands.Create.General.Entity, "Create Entity", EntityID);
  createCommand(context, Commands.Create.General.Languages, "Create Languages");
  createCommand(context, Commands.Create.General.Manifests, "Create Manifests");

  //Project
  createCommandWithID(context, Commands.Create.Project.WorldProject, "Create World, BP, RP project", ProjectID);
  createCommandWithID(context, Commands.Create.Project.Resourcepack, "Create RP", ProjectID);
  createCommandWithID(context, Commands.Create.Project.Behaviorpack, "Create BP", ProjectID);

  //Behavior pack
  createCommand(context, Commands.Create.Behaviorpack.Languages, "Create language files");
  createCommand(context, Commands.Create.Behaviorpack.Manifests, "Create manifest");

  createCommandWithID(context, Commands.Create.Behaviorpack.Animation_Controller, "Create animation controller", AnimationControllerID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Animation, "Create animation", AnimationID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Block, "Create block", BlockID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Dialogue, "Create dialogue", DialogueID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Entity, "Create entity", EntityID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Item, "Create item", ItemID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Loot_Table, "Create loot table", LootTableID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Recipe, "Create recipe", RecipeID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Spawn_Rule, "Create spawn rule", SpawnRuleID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Trading, "Create trading", TradingID);
  createCommandWithID(context, Commands.Create.Behaviorpack.Volume, "Create volume", VolumeID);

  //Resource pack
  createCommand(context, Commands.Create.Resourcepack.Biomes_Client, "Create biomesclient file");
  createCommand(context, Commands.Create.Resourcepack.Blocks, "Create the blocks file");
  createCommand(context, Commands.Create.Resourcepack.Flipbook_Textures, "Create flipbook_textures file");
  createCommand(context, Commands.Create.Resourcepack.Item_Texture, "Create item tereate item texture file");
  createCommand(context, Commands.Create.Resourcepack.Languages, "Create lanreate language file");
  createCommand(context, Commands.Create.Resourcepack.Manifests, "Creatreate all manifest");
  createCommand(context, Commands.Create.Resourcepack.Music_Definitions, "Create the music definireate the music definitions file");
  createCommand(context, Commands.Create.Resourcepack.Sound_Definitions, "Create the sound definireate the sound definitions file");
  createCommand(context, Commands.Create.Resourcepack.Sounds, "Create the sreate the sounds file");
  createCommand(context, Commands.Create.Resourcepack.Terrain_Texture, "Create the terrain texture file");
  createCommand(context, Commands.Create.Resourcepack.Texture_List, "Create texturelist");

  createCommandWithID(context, Commands.Create.Resourcepack.Animation_Controller, "Create animation controllers files", AnimationControllerID);
  createCommandWithID(context, Commands.Create.Resourcepack.Animation, "Create animations files", AnimationID);
  createCommandWithID(context, Commands.Create.Resourcepack.Attachable, "Create attachable files", AttachableID);
  createCommandWithID(context, Commands.Create.Resourcepack.BlockCulling, "Create the block culling rule file", BlockCullingRuleID)
  createCommandWithID(context, Commands.Create.Resourcepack.Entity, "Create entities files", EntityID);
  createCommandWithID(context, Commands.Create.Resourcepack.Fog, "Create fog file", FogID);
  createCommandWithID(context, Commands.Create.Resourcepack.Model, "Create reate model file", ModelID);
  createCommandWithID(context, Commands.Create.Resourcepack.Particle, "Create particle file", ParticleID);
  createCommandWithID(context, Commands.Create.Resourcepack.Render_Controller, "Create render_controller file", RenderControllerID);

  //World
  createCommand(context, Commands.Create.World.Languages, "Create language files");
  createCommand(context, Commands.Create.World.Manifests, "Create manifest");
}

function createCommand(context: ExtensionContext, command: string, title: string) {
  context.subscriptions.push(
    commands.registerCommand(command, (arg: any[]) => {
      onCommandComplete(command, arg);
    })
  );
}

function createCommandWithID(context: ExtensionContext, command: string, title: string, IDRegex: IDExample) {
  context.subscriptions.push(
    commands.registerCommand(command, (arg: any[]) => {
      const opts: InputBoxOptions = {
        validateInput(value): string | undefined {
          return validateID(value, IDRegex);
        },
        title: title,
        prompt: title,
        password: false,
        ignoreFocusOut: true,
        placeHolder: IDRegex.example,
      };

      if (!arg) arg = [];

      if (arg.length > 0) {
        if (typeof arg === "string") return onCompleteID(arg, command);

        if (Array.isArray(arg)) {
          const id = arg[0];
          if (typeof id === "string") return onCompleteID(id, command);
        }
      }

      return window.showInputBox(opts).then((value) => onCompleteID(value, command));
    })
  );
}

function onCompleteID(value: string | undefined, command: string): Promise<any> {
  if (value === undefined) return Promise.resolve();

  const doc = window.activeTextEditor?.document.uri;
  let uri: Uri | undefined = undefined;
  if (doc !== undefined) {
    const ws = workspace.getWorkspaceFolder(doc);
    if (ws !== undefined) {
      uri = ws.uri;
    }
  }

  if (uri === undefined) {
    uri = workspace.workspaceFolders?.[0].uri;

    if (uri === undefined) {
      window.showErrorMessage("No workspace folder found");
      return Promise.resolve();
    }
  }

  const opts: ExecuteCommandParams = {
    command: command,
    args: [value, uri.toString()],
  };

  return Manager.Client.sendRequest(ExecuteCommandRequest.type, opts);
}

function onCommandComplete(command: string, arg: any[]): Promise<any> {
  if (!arg) arg = [];

  arg.push(window.activeTextEditor?.document.uri.toString());

  const opts: ExecuteCommandParams = {
    command: command,
    args: arg,
  };

  return Manager.Client.sendRequest(ExecuteCommandRequest.type, opts);
}

function validateID(ID: string, IDRegex: IDExample): string | undefined {
  if (ID === undefined) return undefined;

  if (ID.match(IDRegex.ID)) {
    return undefined;
  } else {
    return `Does not match pattern: ${IDRegex.example}`;
  }
}
