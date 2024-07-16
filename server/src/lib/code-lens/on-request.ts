import { DataSet, ProjectData } from "bc-minecraft-bedrock-project";
import { CancellationToken, CodeLens, CodeLensParams, Position, Range } from "vscode-languageserver";
import { CodeLensBuilder } from "./builder";
import { Console } from "../manager";
import { Database } from "../database/database";
import { GetDocument } from "../types/Document/Document";
import { Manager } from "../manager/manager";
import { TextDocument } from "../types/Document/TextDocument";
import { Types } from "bc-minecraft-bedrock-types";
import { QueueProcessor } from "@daanv2/queue-processor";
import { Languages } from "@blockception/shared";

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeLensRequest(
  params: CodeLensParams,
  token: CancellationToken
): Promise<CodeLens[] | null | undefined> {
  //If code lens is disabled
  if (!Manager.Settings.Plugin.CodeLens) return undefined;

  return Console.request("Code Lens", internalRequest(params, token));
}

/**
 *
 * @param params
 * @returns
 */
async function internalRequest(
  params: CodeLensParams,
  token: CancellationToken
): Promise<CodeLens[] | null | undefined> {
  const builder = new CodeLensBuilder(params);
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  const pd = Database.ProjectData;
  const items = config(pd);

  // Queue processor to batch all the data
  await QueueProcessor.forEach(items, (item) => {
    if (token.isCancellationRequested) return;

    return forEach(item, doc, builder);
  });

  return builder.out;
}

function forEach<T extends Types.BaseObject>(config: LensConfig<T>, doc: TextDocument, builder: CodeLensBuilder) {
  if (config.regex === undefined) {
    config.regex = isJson(doc) ? jsonRegex : defaultRegex;
  }

  config.data.forEach((item) => {
    if (item.location.uri === doc.uri) return;

    const text = doc.getText();
    const regex = config.regex!(item.id, doc);
    const matches = regex.exec(text);

    if (!matches) return;
    let index = matches.index;

    matches.forEach((match) => {
      index = text.indexOf(match, index);
      if (index < 0) return;

      builder.Push({ range: createRange(index, doc, match.length), data: item });

      index += match.length;
    });
  });
}

interface LensConfig<T extends Types.Identifiable & Types.Locatable> {
  data: Pick<DataSet<T>, "forEach">;

  regex?: (id: string, doc: TextDocument) => RegExp;
}

function isJson(doc: TextDocument) {
  return doc.languageId === Languages.JsonIdentifier || doc.languageId === Languages.JsonCIdentifier;
}

function jsonRegex(id: string, doc: TextDocument) {
  return new RegExp(`\"${id}\"`, "g");
}

function defaultRegex(id: string, doc: TextDocument) {
  return new RegExp(`\\b${id}\\b`, "g");
}

function selectorThing(id: string, doc: TextDocument) {
  return isJson(doc) ? new RegExp(`\\b(${id}=|=${id})\\b`, "g") : defaultRegex(id, doc);
}

function config(pd: ProjectData) {
  return [
    { data: pd.General.fakeEntities, regex: defaultRegex },
    { data: pd.General.objectives, regex: selectorThing },
    { data: pd.General.structures, regex: defaultRegex },
    { data: pd.General.tags, regex: selectorThing },
    { data: pd.General.tickingAreas, regex: defaultRegex },
    { data: pd.BehaviorPacks.animation_controllers },
    { data: pd.BehaviorPacks.animations },
    { data: pd.BehaviorPacks.blocks },
    { data: pd.BehaviorPacks.entities },
    { data: pd.BehaviorPacks.functions, regex: defaultRegex },
    { data: pd.BehaviorPacks.items },
    { data: pd.BehaviorPacks.loot_tables, regex: defaultRegex },
    { data: pd.BehaviorPacks.structures },
    { data: pd.BehaviorPacks.trading },
    { data: pd.ResourcePacks.animation_controllers },
    { data: pd.ResourcePacks.animations },
    { data: pd.ResourcePacks.attachables },
    { data: pd.ResourcePacks.block_culling_rules },
    { data: pd.ResourcePacks.entities },
    { data: pd.ResourcePacks.fogs },
    { data: pd.ResourcePacks.materials },
    { data: pd.ResourcePacks.models },
    { data: pd.ResourcePacks.particles },
    { data: pd.ResourcePacks.render_controllers },
    { data: pd.ResourcePacks.sounds },
    { data: pd.ResourcePacks.textures, regex: defaultRegex },
  ];
}

function createRange(index: number, doc: TextDocument, length: number) {
  const p = doc.positionAt(index);
  return Range.create(p, Position.create(p.line, p.character + length));
}
