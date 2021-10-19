import { GetFilename, Vscode } from "../Code/include";
import { DocumentSymbolParams, SymbolInformation, SymbolKind, Location, Range, WorkspaceSymbolParams } from "vscode-languageserver";
import { Database } from "../Database/include";
import { Kinds } from "../Minecraft/General/Kinds";
import { SymbolBuilder } from "./SymbolBuilder";

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
  //TODO language and other files included
  let uri = params.textDocument.uri;
  uri = Vscode.FromFs(uri);

  if (uri.endsWith(".json")) return undefined;

  const Out: SymbolInformation[] = [];

  Out.push({
    kind: SymbolKind.Class,
    location: Location.create(uri, Range.create(0, 0, 0, 0)),
    name: GetFilename(uri),
  });

  //TODO redo
  //ConvertAllFile(uri, Out);

  return Out;
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
  builder.generate(data.General.fakeEntities, Kinds.Symbol.FakeEntity);
  builder.generate(data.General.objectives, Kinds.Symbol.Objectives);
  builder.generate(data.General.structures, Kinds.Symbol.Structure);
  builder.generate(data.General.tags, Kinds.Symbol.Tag);
  builder.generate(data.General.tickingAreas, Kinds.Symbol.Tickingarea);

  //Resourcepack
  builder.generate(data.ResourcePacks.animations, Kinds.Symbol.Animation);
  builder.generate(data.ResourcePacks.animation_controllers, Kinds.Symbol.AnimationControllers);
  builder.generate(data.ResourcePacks.attachables, Kinds.Symbol.Item);
  builder.generate(data.ResourcePacks.blocks, Kinds.Symbol.Block);
  builder.generate(data.ResourcePacks.entities, Kinds.Symbol.Entity);
  builder.generate(data.ResourcePacks.fogs, Kinds.Symbol.Fogs);
  builder.generate(data.ResourcePacks.materials, Kinds.Symbol.Materials);
  builder.generate(data.ResourcePacks.models, Kinds.Symbol.Models);
  builder.generate(data.ResourcePacks.particles, Kinds.Symbol.Particle);
  builder.generate(data.ResourcePacks.render_controllers, Kinds.Symbol.RenderController);
  builder.generate(data.ResourcePacks.sounds, Kinds.Symbol.Sound);
  builder.generate(data.ResourcePacks.textures, Kinds.Symbol.Texture);

  //Behaviour pack
  builder.generate(data.BehaviorPacks.animations, Kinds.Symbol.Animation);
  builder.generate(data.BehaviorPacks.animation_controllers, Kinds.Symbol.AnimationControllers);
  builder.generate(data.BehaviorPacks.blocks, Kinds.Symbol.Block);
  builder.generate(data.BehaviorPacks.entities, Kinds.Symbol.Entity);
  builder.generate(data.BehaviorPacks.items, Kinds.Symbol.Item);
  builder.generate(data.BehaviorPacks.loot_tables, Kinds.Symbol.LootTable);
  builder.generate(data.BehaviorPacks.structures, Kinds.Symbol.Structure);
  builder.generate(data.BehaviorPacks.trading, Kinds.Symbol.Trading);

  return builder.items;
}
