import { OffsetWord } from "bc-vscode-words";
import { McfunctionSemanticTokensBuilder } from "./Builders/include";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

export function CreateRangeTokens(Word: OffsetWord, Builder: McfunctionSemanticTokensBuilder): void {
  let value = Word.text;
  let start = Word.offset;

  if (value.startsWith("~-") || value.startsWith("~+") || value.startsWith("^-") || value.startsWith("^+")) {
    Builder.AddAt(Word.offset, start, 2, SemanticTokensEnum.operator, SemanticModifiersEnum.readonly);

    value = value.substring(2);
    start += 2;
  } else if (value.startsWith("~") || value.startsWith("^") || value.startsWith("-") || value.startsWith("+") || value.startsWith("+") || value.startsWith("!")) {
    Builder.AddAt(Word.offset, start, 1, SemanticTokensEnum.operator, SemanticModifiersEnum.readonly);

    value = value.substring(1);
    start++;
  }

  if (value === "") return;

  let Range = value.indexOf("..");
  let Line = Word.offset;

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
