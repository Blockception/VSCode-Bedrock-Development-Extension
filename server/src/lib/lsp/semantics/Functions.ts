import { LocationWord, OffsetWord, RangedWord } from "bc-vscode-words";
import { Range } from "vscode-languageserver-types";
import { McfunctionSemanticTokensBuilder } from "./builders";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./constants";

/**
 *
 * @param word
 * @param builder
 */
export function CreateRangeTokensWord(word: LocationWord | RangedWord | OffsetWord, builder: McfunctionSemanticTokensBuilder): void {
  if (OffsetWord.is(word)) {
    word = new RangedWord(word.text, Range.create(builder.doc.positionAt(word.offset), builder.doc.positionAt(word.offset + word.text.length)));
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
  } else if (value.startsWith("~") || value.startsWith("^") || value.startsWith("-") || value.startsWith("+") || value.startsWith("+") || value.startsWith("!")) {
    builder.AddAt(word.range.start.line, start, 1, SemanticTokensEnum.operator, SemanticModifiersEnum.readonly);

    value = value.substring(1);
    start++;
  }

  if (value === "") return;

  let Range = value.indexOf("..");
  let Line = word.range.start.line;

  if (Range >= 0) {
    var First = value.substring(0, Range);
    var Second = value.substring(Range + 2);

    //Builder.AddAt(Line, start + Range, 1, SemanticTokensEnum.operator);

    if (First && First !== "") {
      builder.AddAt(Line, start + value.indexOf(First), First.length, SemanticTokensEnum.number, SemanticModifiersEnum.readonly);
    }

    if (Second && Second !== "") {
      builder.AddAt(Line, start + value.indexOf(Second), Second.length, SemanticTokensEnum.number, SemanticModifiersEnum.readonly);
    }
  } else {
    builder.AddAt(Line, start, value.length, SemanticTokensEnum.number);
  }
}

/**
 *
 * @param word
 * @param builder
 */
export function CreateNamespaced(word: OffsetWord, builder: McfunctionSemanticTokensBuilder): void {
  const text = word.text;
  
  if(text.startsWith('"') || text.endsWith('"')) {
    builder.AddWord(word, SemanticTokensEnum.string, SemanticModifiersEnum.static);
    return;
  }

  let Index = text.indexOf(":");

  if (Index >= 0) {
    Index += word.offset;

    //namespace
    builder.Add(word.offset, Index, SemanticTokensEnum.namespace, SemanticModifiersEnum.static);
    //Value
    builder.Add(Index + 1, word.offset + word.text.length, SemanticTokensEnum.method, SemanticModifiersEnum.static);
  } else {
    builder.AddWord(word, SemanticTokensEnum.method, SemanticModifiersEnum.readonly);
  }
}
