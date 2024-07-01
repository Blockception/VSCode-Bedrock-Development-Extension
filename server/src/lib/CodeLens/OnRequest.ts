import { BehaviorPack, DataSet, ResourcePack } from "bc-minecraft-bedrock-project";
import { CodeLens, CodeLensParams } from "vscode-languageserver";
import { CodeLensBuilder } from "./Builder";
import { Console } from "../Manager";
import { Database } from "../Database/Database";
import { GetDocument } from "../Types/Document/Document";
import { GetPosition, GetRange } from "../Code/DocumentLocation";
import { Manager } from "../Manager/Manager";
import { TextDocument } from "../Types/Document/TextDocument";
import { Types } from "bc-minecraft-bedrock-types";

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeLensRequestAsync(params: CodeLensParams): Promise<CodeLens[] | null | undefined> {
  return Console.request("Code Lens", Promise.resolve(OnCodeLensRequest(params)));
}

/**
 *
 * @param params
 * @returns
 */
export function OnCodeLensRequest(params: CodeLensParams): CodeLens[] | null | undefined {
  //If code lens is disabled
  if (!Manager.Settings.Plugin.CodeLens) return undefined;

  const doc = GetDocument(params.textDocument.uri);
  if (!doc) return undefined;

  const pack = Database.ProjectData.get(doc);
  if (!pack) return undefined;

  //Nothing
  const builder = new CodeLensBuilder(params);

  if (ResourcePack.ResourcePack.is(pack) || BehaviorPack.BehaviorPack.is(pack)) {
    loop(<DataSet<Types.BaseObject>>pack.getDataset(doc.uri), doc, builder);
  }

  forEach(Database.ProjectData.General.fakeEntities, doc, builder);
  forEach(Database.ProjectData.General.objectives, doc, builder);
  forEach(Database.ProjectData.General.structures, doc, builder);
  forEach(Database.ProjectData.General.tags, doc, builder);
  forEach(Database.ProjectData.General.tickingAreas, doc, builder);

  return builder.out;
}

function loop(set: DataSet<Types.BaseObject> | undefined, doc: TextDocument, builder: CodeLensBuilder) {
  if (set === undefined) return;

  forEach(set, doc, builder);
}

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeLensResolveRequestAsync(params: CodeLens): Promise<CodeLens> {
  return Promise.resolve(OnCodeLensResolveRequest(params));
}

export function OnCodeLensResolveRequest(code: CodeLens): CodeLens {
  const data = <Types.BaseObject>code.data;

  if (!Types.BaseObject.is(data)) return code;

  const doc = GetDocument(data.location.uri);
  if (!doc) return code;

  const p = GetPosition(data.location.position, doc);

  code.command = {
    title: data.documentation ?? "",
    command: "workbench.action.findInFiles",
    arguments: [
      {
        query: data.id,
        isCaseSensitive: true,
        matchWholeWord: true,
        isRegexp: false,
      },
    ],
  };

  return code;
}

function forEach<T extends Types.BaseObject>(data: DataSet<T>, doc: TextDocument, builder: CodeLensBuilder) {
  data.forEach((item) => {
    if (item.location.uri !== doc.uri) return;

    const range = GetRange(item.location.position, doc);
    builder.Push({
      range: range,
      data: item,
      command: {
        command: "workbench.action.findInFiles",
        title: item.documentation ?? item.id,
        arguments: [
          {
            query: item.id,
            isCaseSensitive: true,
            matchWholeWord: true,
            isRegexp: false,
          },
        ],
      },
    });
  });
}
