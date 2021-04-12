import { LocationWord } from "bc-vscode-words";
import { IParameter, IScoreParameter, Selector } from "../Types/General/Selector/include";
import { McfunctionSemanticTokensBuilder } from "./Builders/McfunctionSemanticTokensBuilder";
import { CreateRangeTokens } from "./Functions";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

export function CreateSelectorTokens(Word: LocationWord, Builder: McfunctionSemanticTokensBuilder): void {
  if (Word.text.startsWith("@")) {
    let sel = Selector.Parse(Word);

    let Start = Word.location.range.start;

    Builder.AddAt(Start.line, Start.character, 2, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);

    ProcessParameters(sel.Parameters, Builder);
  } else {
    Builder.AddWord(Word, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);
  }
}

function ProcessParameters(Parameters: IParameter[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];

    CreateTokens(parameter, Builder);
  }
}

function ProcessScoreParameters(Parameters: IParameter[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];

    CreateTokens(parameter, Builder);
  }
}

function CreateTokens(Parameter: IParameter | IScoreParameter, Builder: McfunctionSemanticTokensBuilder): void {
  //process header
  let Name = Parameter.Name;
  let Value = Parameter.Value;

  Builder.AddWord(Name, SemanticTokensEnum.parameter, SemanticModifiersEnum.readonly);

  if (IScoreParameter.is(Parameter)) {
    ProcessScoreParameters(Parameter.Scores, Builder);
    return;
  }

  switch (Name.text) {
    case "name":
      Builder.AddWord(Value, SemanticTokensEnum.string);
      break;

    case "tag":
      Builder.AddWord(Value, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);
      break;

    case "type":
      let Index = Value.text.indexOf(":");

      if (Index >= 0) {
        let LineIndex = Value.range.start.line;
        let ValueStart = Value.range.start.character;

        Builder.AddAt(LineIndex, ValueStart, Index, SemanticTokensEnum.namespace, SemanticModifiersEnum.readonly);
        Builder.AddAt(LineIndex, ValueStart + Index + 1, Value.text.length - (Index + 1), SemanticTokensEnum.method, SemanticModifiersEnum.readonly);
      } else {
        Builder.AddWord(Value, SemanticTokensEnum.type, SemanticModifiersEnum.readonly);
      }
      break;

    default:
      CreateRangeTokens(Value, Builder);

      break;
  }
}
