import { PackType } from "bc-minecraft-bedrock-project";
import { Range } from "vscode-languageserver-textdocument";
import { SemanticTokens } from "vscode-languageserver/node";
import { IsMolang } from "../Molang/Functions";
import { CreateMolangWords } from "../Molang/Words";
import { TextDocument } from "../../Types/Document/TextDocument";
import { JsonSemanticTokensBuilder } from "../../Semantics/Builders/JsonSemanticTokensBuilder";
import { McfunctionSemanticTokensBuilder } from "../../Semantics/Builders/McfunctionSemanticTokensBuilder";
import { SemanticTokensEnum } from "../../Semantics/Legend";
import { McfunctionLineTokens } from "../Mcfunction/Semantics";
import { ConvertWords } from "../../Semantics/Molang";

export function ProvideJsonSemanticTokens(doc: TextDocument, range?: Range | undefined): SemanticTokens {
  const Type = PackType.detect(doc.uri);

  //Not related to minecraft
  if (Type == PackType.unknown) return { data: [] };

  const Builder = new JsonSemanticTokensBuilder(doc);
  const text = doc.getText(range);
  const offset = range ? doc.offsetAt(range.start) : 0;

  CreateTokens(text, offset, Builder);

  return Builder.Build();
}

/**
 *
 * @param text
 * @param offset
 * @param Builder
 */
function CreateTokens(text: string, offset: number, Builder: JsonSemanticTokensBuilder): void {
  let index = 0;

  while (index >= 0) {
    let startindex = findNext(text, index);
    if (startindex < 0) return;

    let endindex = findNext(text, startindex + 1);
    if (endindex < 0) return;

    startindex++;
    let property = text.substring(startindex, endindex);
    index = endindex + 1;

    if (IsMolang(property)) {
      if (property.startsWith("/")) {
        property = property.substring(1);
        Builder.Add(startindex, startindex + 1, SemanticTokensEnum.operator);
        startindex++;
        McfunctionLineTokens(property, 0, offset + startindex, McfunctionSemanticTokensBuilder.FromJson(Builder));
      } else {
        const Words = CreateMolangWords(property, offset + startindex);
        ConvertWords(Words, Builder);
      }
    }
  }
}

function findNext(text: string, startIndex: number): number {
  while (startIndex > -1) {
    startIndex = text.indexOf('"', startIndex);
    if (startIndex < 0) break;

    if (text.charAt(startIndex - 1) === "\\" && text.charAt(startIndex - 2) !== "\\") {
      startIndex++;
      continue;
    }

    return startIndex;
  }

  return -1;
}
