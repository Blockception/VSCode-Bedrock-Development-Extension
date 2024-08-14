import { Languages } from "@blockception/shared";
import { DataSet, ProjectData } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { CodeLens, CodeLensParams, Position, Range } from "vscode-languageserver";
import { Processor } from "../../util";
import { Context } from "../context/context";
import { TextDocument } from "../documents";
import { CodeLensBuilder } from "./builder";
import { CodeLensContext } from "./context";

/**
 *
 * @param params
 * @returns
 */
export async function internalRequest(
  context: Context<CodeLensContext>,
  params: CodeLensParams
): Promise<CodeLens[] | null | undefined> {
  const document = context.documents.get(params.textDocument.uri);
  if (!document) return undefined;

  const builder = new CodeLensBuilder(params, context.token);
  const pd = context.database.ProjectData;
  const items = config(pd);

  // Queue processor to batch all the data
  await Processor.forEach(items, (item) => forEach(item, document, builder), context.token, context.workDoneProgress);

  return builder.out;
}

function forEach<T extends Types.BaseObject>(config: LensConfig<T>, doc: TextDocument, builder: CodeLensBuilder) {
  if (config.regex === undefined) {
    config.regex = defaultRegex;
  }

  const text = doc.getText();
  config.data.forEach((item) => {
    if (builder.token.isCancellationRequested) return;
    if (item.location.uri === doc.uri) return;

    const regex = config.regex!(item.id, doc);
    const matches = regex.exec(text);

    if (!matches) return;
    let index = matches.index;

    matches.forEach((match) => {
      index = text.indexOf(match, index);
      if (index < 0) return;

      builder.push({ range: createRange(index, doc, match.length), data: item });

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

function defaultRegex(id: string) {
  return new RegExp(`\\b${id}\\b`, "g");
}

function selectorThing(id: string, doc: TextDocument) {
  return isJson(doc) ? new RegExp(`\\b(${id}=|=${id})\\b`, "g") : defaultRegex(id);
}

function config(pd: ProjectData) {
  return [
    { data: pd.general.fakeEntities, regex: defaultRegex },
    { data: pd.general.objectives, regex: selectorThing },
    { data: pd.general.structures, regex: defaultRegex },
    { data: pd.general.tags, regex: selectorThing },
    { data: pd.general.tickingAreas, regex: defaultRegex },
    { data: pd.behaviorPacks.animation_controllers },
    { data: pd.behaviorPacks.animations },
    { data: pd.behaviorPacks.blocks },
    { data: pd.behaviorPacks.entities },
    { data: pd.behaviorPacks.functions, regex: defaultRegex },
    { data: pd.behaviorPacks.items },
    { data: pd.behaviorPacks.loot_tables, regex: defaultRegex },
    { data: pd.behaviorPacks.structures },
    { data: pd.behaviorPacks.trading },
    { data: pd.resourcePacks.animation_controllers },
    { data: pd.resourcePacks.animations },
    { data: pd.resourcePacks.attachables },
    { data: pd.resourcePacks.block_culling_rules },
    { data: pd.resourcePacks.entities },
    { data: pd.resourcePacks.fogs },
    { data: pd.resourcePacks.materials },
    { data: pd.resourcePacks.models },
    { data: pd.resourcePacks.particles },
    { data: pd.resourcePacks.render_controllers },
    { data: pd.resourcePacks.sounds },
    { data: pd.resourcePacks.textures, regex: defaultRegex },
  ];
}

function createRange(index: number, doc: TextDocument, length: number) {
  const p = doc.positionAt(index);
  return Range.create(p, Position.create(p.line, p.character + length));
}
