import { CreateMolangWords } from "../../../minecraft/molang/words";
import { Float } from "bc-minecraft-bedrock-types/lib/src/general/float";
import { Minecraft } from "bc-minecraft-bedrock-types";
import { OffsetWord } from "bc-vscode-words";
import { Range } from "vscode-languageserver-textdocument";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../constants";
import { SemanticTokens } from "vscode-languageserver/node";
import { TextDocument } from "../../documents/text-document";
import { MolangSemanticTokensBuilder } from "../builders/molang";
import { JsonSemanticTokensBuilder } from "../builders/json";

/**
 *
 * @param document
 * @param range
 * @returns
 */
export function provideMolangSemanticTokens(document: TextDocument, range?: Range | undefined): SemanticTokens {
  const builder = new MolangSemanticTokensBuilder(document);
  const text = document.getText(range);
  const offset = range ? document.offsetAt(range.start) : 0;
  const words = CreateMolangWords(text, offset);
  ConvertWords(words, builder);

  return builder.Build();
}

/**
 *
 * @param words
 * @param builder
 */
export function ConvertWords(words: OffsetWord[], builder: JsonSemanticTokensBuilder | MolangSemanticTokensBuilder) {
  for (let I = 0; I < words.length; I++) {
    const Word = words[I];

    let text = Word.text;

    if ((text.startsWith("'") && text.endsWith("'")) || (text.startsWith('"') && text.endsWith('"'))) {
      builder.AddWord(Word, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);

      continue;
    }

    switch (text.toLowerCase()) {
      case "array":
      case "geometry":
      case "material":
      case "texture":
        builder.AddWord(Word, SemanticTokensEnum.interface, SemanticModifiersEnum.readonly);
        break;

      case "q":
      case "v":
      case "t":
      case "c":
      case "context":
      case "math":
      case "query":
      case "variable":
      case "temp":
        builder.AddWord(Word, SemanticTokensEnum.class, SemanticModifiersEnum.static);
        break;

      case "this":
        builder.AddWord(Word, SemanticTokensEnum.keyword, SemanticModifiersEnum.readonly);
        break;

      case "(":
      case "[":
      case "{":
      case "}":
      case "]":
      case ")":
      case "==":
      case "!=":
      case "&&":
      case "||":
      case "|=":
      case ">=":
      case "<=":
      case ">":
      case "!":
      case "<":
      case "?":
      case ":":
      case ";":
      case "+":
      case "-":
      case "/":
      case "*":
        builder.AddWord(Word, SemanticTokensEnum.operator);
        break;

      default:
        ConvertWordsDefault(words, I, builder);
    }
  }
}

/**
 *
 * @param words
 * @param index
 * @param builder
 */
function ConvertWordsDefault(words: OffsetWord[], index: number, builder: JsonSemanticTokensBuilder): void {
  const word = words[index];
  const text = word.text;

  if (Float.is(text)) {
    builder.AddWord(word, SemanticTokensEnum.number);
    return;
  }

  if (Minecraft.Selector.Selector.isSelector(text, undefined)) {
    builder.AddWord(word, SemanticTokensEnum.variable);
    return;
  }

  if (words[index + 1]?.text === ":") {
    builder.AddWord(word, SemanticTokensEnum.namespace);
    return;
  }

  builder.AddWord(word, SemanticTokensEnum.method);
}
