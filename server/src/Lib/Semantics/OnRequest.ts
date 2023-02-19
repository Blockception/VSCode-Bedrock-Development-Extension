import { Console } from "../Manager/Console";
import { GetDocument } from "../Types/Document/Document";
import { Languages } from '../../../../shared/src';
import { ProvideJsonSemanticTokens } from "../Minecraft/Json/Semantics";
import { ProvideMolangSemanticTokens } from "../Minecraft/Molang/Semantics";
import { Range, SemanticTokens } from "vscode-languageserver/node";
import { SemanticTokensParams, SemanticTokensRangeParams } from "vscode-languageserver/node";
import * as Mcfunction from "../Minecraft/Mcfunction/Semantics";

export async function OnProvideSemanticRequestAsync(params: SemanticTokensParams): Promise<SemanticTokens> {
  try {
    return Console.request("Semantics", Promise.resolve(OnProvideSemanticRequest(params)));
  } catch (err) {
    return { data: [] };
  }
}

export async function OnProvideRangeSemanticRequestAsync(params: SemanticTokensRangeParams): Promise<SemanticTokens> {
  try {
    return Console.request("Semantics", Promise.resolve(OnProvideSemanticRequestAsync(params)));
  } catch (err) {
    return { data: [] };
  }
}

function OnProvideSemanticRequest(params: SemanticTokensRangeParams | SemanticTokensParams): SemanticTokens {
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
      return ProvideJsonSemanticTokens(doc, range);

    case Languages.McFunctionIdentifier:
      return Mcfunction.ProvideSemanticToken(doc, range);

    case Languages.McMolangIdentifier:
      return ProvideMolangSemanticTokens(doc, range);

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
