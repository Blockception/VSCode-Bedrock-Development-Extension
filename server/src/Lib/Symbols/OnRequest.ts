import { BehaviorPack, ResourcePack } from "bc-minecraft-bedrock-project";
import { Console } from "../Manager";
import { Database } from "../Database/Database";
import { DocumentSymbolParams, SymbolInformation, SymbolKind, WorkspaceSymbolParams } from "vscode-languageserver";
import { Fs, GetDirectory, GetFilename, Vscode } from "../Code";
import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types";
import { Kinds } from "../Minecraft/General/Kinds";
import { SymbolBuilder } from "./SymbolBuilder";

/**
 * The request to provide document symbols
 * @param params The parameter that specify which symbols to provide
 */
export async function OnDocumentSymbolRequestAsync(
  params: DocumentSymbolParams
): Promise<SymbolInformation[] | undefined> {
  return Console.request("Symbols, Document", Promise.resolve(OnDocumentSymbolRequest(params)));
}

/**
 * The request to provide workspace symbols
 * @param params The parameter that specify which symbols to provide
 */
export async function OnWorkspaceSymbolRequestAsync(params: WorkspaceSymbolParams): Promise<SymbolInformation[]> {
  return Console.request("Symbols, Workspace", Promise.resolve(OnWorkspaceSymbolRequest(params)));
}

/**
 * The request to provide document symbols
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

  builder.kind = Kinds.Symbol.FakeEntity;
  data.General.fakeEntities.forEach(check);

  builder.kind = Kinds.Symbol.Objectives;
  data.General.objectives.forEach(check);

  builder.kind = Kinds.Symbol.Structure;
  data.General.structures.forEach(check);

  builder.kind = Kinds.Symbol.Tag;
  data.General.tags.forEach(check);

  builder.kind = Kinds.Symbol.Tickingarea;
  data.General.tickingAreas.forEach(check);

  if (uri.endsWith(".json")) return builder.items;

  const filename = GetFilename(uri);
  if (filename !== "") builder.new(filename, SymbolKind.Class);  

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
