import { LocationWord, OffsetWord, RangedWord } from "bc-vscode-words";
import { Range } from "vscode-languageserver-types";
import { McfunctionSemanticTokensBuilder } from "./Builders";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

/**
 *
 * @param Word
 * @param Builder
 */
export function CreateRangeTokensWord(Word: LocationWord | RangedWord | OffsetWord, Builder: McfunctionSemanticTokensBuilder): void {
  if (OffsetWord.is(Word)) {
    Word = new RangedWord(Word.text, Range.create(Builder.doc.positionAt(Word.offset), Builder.doc.positionAt(Word.offset + Word.text.length)));
  } else if (LocationWord.is(Word)) {
    Word = new RangedWord(Word.text, Word.location.range);
  }

  CreateRangeTokens(Word, Builder);
}

/**
 *
 * @param Word
 * @param Builder
 * @returns
 */
export function CreateRangeTokens(Word: RangedWord, Builder: McfunctionSemanticTokensBuilder): void {
  let value = Word.text;
  let start = Word.range.start.character;

  if (value.startsWith("~-") || value.startsWith("~+") || value.startsWith("^-") || value.startsWith("^+")) {
    Builder.AddAt(Word.range.start.line, start, 2, SemanticTokensEnum.operator, SemanticModifiersEnum.readonly);

    value = value.substring(2);
    start += 2;
  } else if (value.startsWith("~") || value.startsWith("^") || value.startsWith("-") || value.startsWith("+") || value.startsWith("+") || value.startsWith("!")) {
    Builder.AddAt(Word.range.start.line, start, 1, SemanticTokensEnum.operator, SemanticModifiersEnum.readonly);

    value = value.substring(1);
    start++;
  }

  if (value === "") return;

  let Range = value.indexOf("..");
  let Line = Word.range.start.line;

  if (Range >= 0) {
    var First = value.substring(0, Range);
    var Second = value.substring(Range + 2);

    //Builder.AddAt(Line, start + Range, 1, SemanticTokensEnum.operator);

    if (First && First !== "") {
      Builder.AddAt(Line, start + value.indexOf(First), First.length, SemanticTokensEnum.number, SemanticModifiersEnum.readonly);
    }

    if (Second && Second !== "") {
      Builder.AddAt(Line, start + value.indexOf(Second), Second.length, SemanticTokensEnum.number, SemanticModifiersEnum.readonly);
    }
  } else {
    Builder.AddAt(Line, start, value.length, SemanticTokensEnum.number);
  }
}

/**
 *
 * @param Word
 * @param Builder
 */
export function CreateNamespaced(Word: OffsetWord, Builder: McfunctionSemanticTokensBuilder): void {
  const text = Word.text;
  
  if(text.startsWith('"') || text.endsWith('"')) {
    Builder.AddWord(Word, SemanticTokensEnum.string, SemanticModifiersEnum.static);
    return;
  }

  let Index = text.indexOf(":");

  if (Index >= 0) {
    Index += Word.offset;

    //namespace
    Builder.Add(Word.offset, Index, SemanticTokensEnum.namespace, SemanticModifiersEnum.static);
    //Value
    Builder.Add(Index + 1, Word.offset + Word.text.length, SemanticTokensEnum.method, SemanticModifiersEnum.static);
  } else {
    Builder.AddWord(Word, SemanticTokensEnum.method, SemanticModifiersEnum.readonly);
  }
}
