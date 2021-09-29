import { BehaviorPack, DataSet, ResourcePack } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { CodeLens, CodeLensParams } from "vscode-languageserver";
import { GetPosition, GetRange } from "../Code/DocumentLocation";
import { Database } from "../Database/include";
import { GetDocument, TextDocument } from "../Types/Document/include";
import { CodeLensBuilder } from "./Builder";

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeLensRequestAsync(params: CodeLensParams): Promise<CodeLens[] | null | undefined> {
  return new Promise<CodeLens[] | null | undefined>((resolve, reject) => {
    resolve(OnCodeLensRequest(params));
  });
}

/**
 *
 * @param params
 * @returns
 */
export function OnCodeLensRequest(params: CodeLensParams): CodeLens[] | null | undefined {
  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  const pack = Database.ProjectData.get(doc);
  if (!pack) return undefined;

  //Nothing
  const builder = new CodeLensBuilder(params);

  if (ResourcePack.ResourcePack.is(pack)) {
    forEach(pack.animation_controllers, doc, builder);
    forEach(pack.animations, doc, builder);
    forEach(pack.attachables, doc, builder);
    forEach(pack.blocks, doc, builder);
    forEach(pack.entities, doc, builder);
    forEach(pack.fogs, doc, builder);
    forEach(pack.materials, doc, builder);
    forEach(pack.models, doc, builder);
    forEach(pack.particles, doc, builder);
    forEach(pack.render_controllers, doc, builder);
    forEach(pack.sounds, doc, builder);
    //Skipping textures
    //forEach(pack.textures, doc, builder);
  } else if (BehaviorPack.BehaviorPack.is(pack)) {
    forEach(pack.animation_controllers, doc, builder);
    forEach(pack.animations, doc, builder);
    forEach(pack.blocks, doc, builder);
    forEach(pack.entities, doc, builder);
    forEach(pack.functions, doc, builder);
    forEach(pack.items, doc, builder);
    forEach(pack.loot_tables, doc, builder);
    forEach(pack.structures, doc, builder);
    forEach(pack.trading, doc, builder);
  }

  forEach(Database.ProjectData.General.fakeEntities, doc, builder);
  forEach(Database.ProjectData.General.objectives, doc, builder);
  forEach(Database.ProjectData.General.structures, doc, builder);
  forEach(Database.ProjectData.General.tags, doc, builder);
  forEach(Database.ProjectData.General.tickingAreas, doc, builder);

  return builder.out;
}

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeLensResolveRequestAsync(params: CodeLens): Promise<CodeLens> {
  return new Promise<CodeLens>((resolve, reject) => {
    resolve(OnCodeLensResolveRequest(params));
  });
}

export function OnCodeLensResolveRequest(code: CodeLens): CodeLens {
  const data = <Types.BaseObject>code.data;

  if (!Types.BaseObject.is(data)) return code;

  const doc = GetDocument(data.location.uri);
  if (!doc) return code;

  const p = GetPosition(data.location.position, doc);

  code.command = {
    title: data.documentation ?? "",
    command: "vscode.executeReferenceProvider",
    arguments: [
      //uri - The text document in which to start
      data.location.uri,
      //position - The position at which to start
      p,
    ],
  };

  return code;
}

function forEach<T extends Types.BaseObject>(data: DataSet<T>, doc: TextDocument, builder: CodeLensBuilder) {
  const text = doc.getText();

  data.forEach((item) => {
    if (item.location.uri === doc.uri) return;

    const reg = new RegExp(`\\b${item.id}\\b`);
    const amount = reg.exec(text);

    if (amount === null) return;

    builder.Push({ range: GetRange(amount.index, doc), data: item });
  });
}
