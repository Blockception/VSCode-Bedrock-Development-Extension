import { Fs, GetDirectory, GetFilename, Vscode } from "../Code/include";
import { DocumentSymbolParams, SymbolInformation, SymbolKind, Location, Range, WorkspaceSymbolParams } from "vscode-languageserver";
import { Database } from "../Database/include";
import { Kinds } from "../Minecraft/General/Kinds";
import { SymbolBuilder } from "./SymbolBuilder";
import { BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";
import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from "constants";

/**
 * The request to provide document symbols, asynchorious
 *
 * @param params The parameter that specify which symbols to provide
 */
export async function OnDocumentSymbolRequestAsync(params: DocumentSymbolParams): Promise<SymbolInformation[] | undefined> {
  return new Promise<SymbolInformation[] | undefined>((resolve, reject) => {
    resolve(OnDocumentSymbolRequest(params));
  });
}

/**
 * The request to provide workspace symbols, asynchorious
 *
 * @param params The parameter that specify which symbols to provide
 */
export async function OnWorkspaceSymbolRequestAsync(params: WorkspaceSymbolParams): Promise<SymbolInformation[]> {
  return new Promise<SymbolInformation[]>((resolve, reject) => {
    resolve(OnWorkspaceSymbolRequest(params));
  });
}

/**
 * The request to provide document symbols
 *
 * @param params The parameter that specify which symbols to provide
 */
function OnDocumentSymbolRequest(params: DocumentSymbolParams): SymbolInformation[] | undefined {
  const builder = new SymbolBuilder();
  const data = Database.ProjectData;
  const uri = Vscode.FromFs(params.textDocument.uri);

  const check = (obj: GeneralInfo) => {
    if (obj.location.uri === uri) {
      builder.add(obj);
    }
  };

  data.General.fakeEntities.forEach(check);
  data.General.objectives.forEach(check);
  data.General.structures.forEach(check);
  data.General.tags.forEach(check);
  data.General.tickingAreas.forEach(check);

  if (uri.endsWith(".json")) return builder.items;
  builder.new(GetFilename(uri), SymbolKind.Class);

  return builder.items;
}

/**
 * The request to provide workspace symbols
 *
 * @param params The parameter that specify which symbols to provide
 */
function OnWorkspaceSymbolRequest(params: WorkspaceSymbolParams): SymbolInformation[] {
  const builder = new SymbolBuilder(params.query);
  const data = Database.ProjectData;

  //General items
  builder.containerName = "General";
  builder.generate(data.General.fakeEntities, Kinds.Symbol.FakeEntity);
  builder.generate(data.General.objectives, Kinds.Symbol.Objectives);
  builder.generate(data.General.structures, Kinds.Symbol.Structure);
  builder.generate(data.General.tags, Kinds.Symbol.Tag);
  builder.generate(data.General.tickingAreas, Kinds.Symbol.Tickingarea);

  //Resource packs
  for (let I = 0; I < data.ResourcePacks.packs.length; I++) convertResourcePack(data.ResourcePacks.packs[I], builder);

  //Behaviour pack
  for (let I = 0; I < data.BehaviorPacks.packs.length; I++) convertBehaviorPacks(data.BehaviorPacks.packs[I], builder);

  return builder.items;
}

function convertResourcePack(pack: ResourcePack.ResourcePack, builder: SymbolBuilder): void {
  const folder = Fs.FromVscode(pack.folder);
  builder.containerName = GetDirectory(folder);

  builder.generate(pack.animations, Kinds.Symbol.Animation);
  builder.generate(pack.animation_controllers, Kinds.Symbol.AnimationControllers);
  builder.generate(pack.attachables, Kinds.Symbol.Item);
  builder.generate(pack.blocks, Kinds.Symbol.Block);
  builder.generate(pack.entities, Kinds.Symbol.Entity);
  builder.generate(pack.fogs, Kinds.Symbol.Fogs);
  builder.generate(pack.materials, Kinds.Symbol.Materials);
  builder.generate(pack.models, Kinds.Symbol.Models);
  builder.generate(pack.particles, Kinds.Symbol.Particle);
  builder.generate(pack.render_controllers, Kinds.Symbol.RenderController);
  builder.generate(pack.sounds, Kinds.Symbol.Sound);
  builder.generate(pack.textures, Kinds.Symbol.Texture);
}

function convertBehaviorPacks(pack: BehaviorPack.BehaviorPack, builder: SymbolBuilder): void {
  const folder = Fs.FromVscode(pack.folder);
  builder.containerName = GetDirectory(folder);

  builder.generate(pack.animations, Kinds.Symbol.Animation);
  builder.generate(pack.animation_controllers, Kinds.Symbol.AnimationControllers);
  builder.generate(pack.blocks, Kinds.Symbol.Block);
  builder.generate(pack.entities, Kinds.Symbol.Entity);
  builder.generate(pack.items, Kinds.Symbol.Item);
  builder.generate(pack.loot_tables, Kinds.Symbol.LootTable);
  builder.generate(pack.structures, Kinds.Symbol.Structure);
  builder.generate(pack.trading, Kinds.Symbol.Trading);
}
