import { Range, SemanticTokens } from "vscode-languageserver/node";
import { SemanticTokensParams, SemanticTokensRangeParams } from "vscode-languageserver/node";
import { HandleError } from "../Code/Error";
import { GetFilename } from "../Code/include";
import { Languages } from "../Constants";
import { GetDocument } from "../Types/Document/include";
import { ProvideJsonSemanticTokens } from "../Minecraft/Json/Semantics";
import { ProvideMolangSemanticTokens } from "./Molang";
import { Mcfunction } from "../Minecraft/include";
import { Console } from "../Manager/Console";

export function OnProvideSemanticRequestAsync(params: SemanticTokensParams): Promise<SemanticTokens> {
  return new Promise<SemanticTokens>((resolve, reject) => {
    try {
      resolve(OnProvideSemanticRequest(params));
    } catch (error) {
      HandleError(error);
      resolve({ data: [] });
    }
  });
}

export function OnProvideRangeSemanticRequestAsync(params: SemanticTokensRangeParams): Promise<SemanticTokens> {
  return new Promise<SemanticTokens>((resolve, reject) => {
    try {
      resolve(OnProvideSemanticRequest(params));
    } catch (error) {
      HandleError(error);
      resolve({ data: [] });
    }
  });
}

function OnProvideSemanticRequest(params: SemanticTokensRangeParams | SemanticTokensParams): SemanticTokens {
  let uri = params.textDocument.uri;
  if (!uri.startsWith("file://")) return { data: [] };

  //Console.Log(params.textDocument.uri);

  const doc = GetDocument(uri);
  if (!doc) return { data: [] };

  Console.Log("Semantic tokens: " + GetFilename(doc.uri) + " | " + doc.languageId);

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

function IsSemanticTokensRangeParams(value: SemanticTokensRangeParams | SemanticTokensParams): value is SemanticTokensRangeParams {
  let temp: any = value;

  if (temp.range && Range.is(temp.range)) return true;

  return false;
}
