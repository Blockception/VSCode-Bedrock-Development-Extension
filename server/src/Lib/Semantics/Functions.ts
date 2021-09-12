import { LocationWord, OffsetWord, RangedWord } from "bc-vscode-words";
import { Range } from "vscode-languageserver-types";
import { World } from "../Data/Templates/include";
import { McfunctionSemanticTokensBuilder } from "./Builders/include";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

export function CreateRangeTokensWord(Word: LocationWord | RangedWord | OffsetWord, Builder: McfunctionSemanticTokensBuilder): void {
  if (OffsetWord.is(Word)) {
    Word = new RangedWord(Word.text, Range.create(Builder.doc.positionAt(Word.offset), Builder.doc.positionAt(Word.offset + Word.text.length)));
  } else if (LocationWord.is(Word)) {
    Word = new RangedWord(Word.text, Word.location.range);
  }

  CreateRangeTokens(Word, Builder);
}

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
