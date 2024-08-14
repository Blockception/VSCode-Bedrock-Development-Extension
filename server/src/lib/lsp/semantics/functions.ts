import { LocationWord, OffsetWord, RangedWord } from "bc-vscode-words";
import { Range } from "vscode-languageserver-types";
import { McfunctionSemanticTokensBuilder } from "./builders/mcfunction";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./constants";

/**
 *
 * @param word
 * @param builder
 */
export function CreateRangeTokensWord(
  word: LocationWord | RangedWord | OffsetWord,
  builder: McfunctionSemanticTokensBuilder
): void {
  if (OffsetWord.is(word)) {
    const range = Range.create(
      builder.document.positionAt(word.offset),
      builder.document.positionAt(word.offset + word.text.length)
    );
    word = new RangedWord(word.text, range);
  } else if (LocationWord.is(word)) {
    word = new RangedWord(word.text, word.location.range);
  }

  CreateRangeTokens(word, builder);
}

/**
 *
 * @param word
 * @param builder
 * @returns
 */
export function CreateRangeTokens(word: RangedWord, builder: McfunctionSemanticTokensBuilder): void {
  let value = word.text;
  let start = word.range.start.character;

  if (value.startsWith("~-") || value.startsWith("~+") || value.startsWith("^-") || value.startsWith("^+")) {
    builder.AddAt(word.range.start.line, start, 2, SemanticTokensEnum.operator, SemanticModifiersEnum.readonly);

    value = value.substring(2);
    start += 2;
  } else if (
    value.startsWith("~") ||
    value.startsWith("^") ||
    value.startsWith("-") ||
    value.startsWith("+") ||
    value.startsWith("+") ||
    value.startsWith("!")
  ) {
    builder.AddAt(word.range.start.line, start, 1, SemanticTokensEnum.operator, SemanticModifiersEnum.readonly);

    value = value.substring(1);
    start++;
  }

  if (value === "") return;

  let range = value.indexOf("..");
  let line = word.range.start.line;

  if (range >= 0) {
    var first = value.substring(0, range);
    var second = value.substring(range + 2);

    //Builder.AddAt(Line, start + Range, 1, SemanticTokensEnum.operator);

    if (first && first !== "") {
      builder.AddAt(
        line,
        start + value.indexOf(first),
        first.length,
        SemanticTokensEnum.number,
        SemanticModifiersEnum.readonly
      );
    }

    if (second && second !== "") {
      builder.AddAt(
        line,
        start + value.indexOf(second),
        second.length,
        SemanticTokensEnum.number,
        SemanticModifiersEnum.readonly
      );
    }
  } else {
    builder.AddAt(line, start, value.length, SemanticTokensEnum.number);
  }
}

/**
 *
 * @param word
 * @param builder
 */
export function CreateNamespaced(word: OffsetWord, builder: McfunctionSemanticTokensBuilder): void {
  const text = word.text;

  if (text.startsWith('"') || text.endsWith('"')) {
    builder.AddWord(word, SemanticTokensEnum.string, SemanticModifiersEnum.static);
    return;
  }

  let index = text.indexOf(":");

  if (index >= 0) {
    index += word.offset;

    //namespace
    builder.Add(word.offset, index, SemanticTokensEnum.namespace, SemanticModifiersEnum.static);
    //Value
    builder.Add(index + 1, word.offset + word.text.length, SemanticTokensEnum.method, SemanticModifiersEnum.static);
  } else {
    builder.AddWord(word, SemanticTokensEnum.method, SemanticModifiersEnum.readonly);
  }
}
