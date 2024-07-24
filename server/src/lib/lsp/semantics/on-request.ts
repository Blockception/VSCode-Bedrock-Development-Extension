import { Console } from "../../manager/console";
import { GetDocument } from "../documents/document";
import { Languages } from "@blockception/shared";
import { provideMolangSemanticTokens } from "./minecraft/molang/main";
import { Range, SemanticTokens } from "vscode-languageserver/node";
import { SemanticTokensParams, SemanticTokensRangeParams } from "vscode-languageserver/node";
import * as Mcfunction from "./minecraft/mcfunctions";
import { provideJsonSemanticTokens } from "./minecraft/json/json";

export async function onProvideSemanticRequestAsync(params: SemanticTokensParams): Promise<SemanticTokens> {
  return Console.request("Semantics", () => onProvideSemanticRequest(params)).then((result) => {
    return result !== undefined ? result : { data: [] };
  });
}

export async function onProvideRangeSemanticRequestAsync(params: SemanticTokensRangeParams): Promise<SemanticTokens> {
  return onProvideSemanticRequestAsync(params);
}

function onProvideSemanticRequest(params: SemanticTokensRangeParams | SemanticTokensParams): SemanticTokens {
  let uri = params.textDocument.uri;
  if (!uri.startsWith("file://")) return { data: [] };

  const doc = GetDocument(uri);
  if (!doc) return { data: [] };

  let range: Range | undefined = undefined;

  if (IsSemanticTokensRangeParams(params)) {
    range = params.range;
  }

  switch (doc.languageId) {
    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return provideJsonSemanticTokens(doc, range);

    case Languages.McFunctionIdentifier:
      return Mcfunction.provideSemanticToken(doc, range);

    case Languages.McMolangIdentifier:
      return provideMolangSemanticTokens(doc, range);

    case Languages.McOtherIdentifier:
    case Languages.McLanguageIdentifier:
      break;
  }

  return { data: [] };
}

function IsSemanticTokensRangeParams(
  value: SemanticTokensRangeParams | SemanticTokensParams
): value is SemanticTokensRangeParams {
  let temp: any = value;

  if (temp.range && Range.is(temp.range)) return true;

  return false;
}
