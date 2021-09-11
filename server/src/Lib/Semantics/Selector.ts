import { Selector, SelectorAttribute } from "bc-minecraft-bedrock-types/lib/src/Minecraft/include";
import { OffsetWord } from "bc-vscode-words";
import { McfunctionSemanticTokensBuilder } from "./Builders/McfunctionSemanticTokensBuilder";
import { CreateRangeTokens } from "./Functions";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

export function CreateSelectorTokens(word: OffsetWord, Builder: McfunctionSemanticTokensBuilder): void {
  if (word.text.startsWith("@")) {
    const sel = Selector.parse(word.text, word.offset);

    Builder.Add(word.offset, word.offset + 2, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);

    ProcessParameters(sel.attributes, Builder);
    ProcessScoreParameters(sel.scores, Builder);
  } else {
    Builder.AddWord(word, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);
  }
}

function ProcessParameters(Parameters: SelectorAttribute[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];

    CreateTokens(parameter, Builder);
  }
}

function ProcessScoreParameters(Parameters: SelectorAttribute[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];
  }
}

function CreateTokens(Parameter: SelectorAttribute, Builder: McfunctionSemanticTokensBuilder): void {
  //process header
  const Name = new OffsetWord(Parameter.name, Parameter.offset);
  const Value = new OffsetWord(Parameter.value, Name.offset + Name.text.length + 1);

  //property name
  Builder.Add(Parameter.offset, Parameter.offset + Parameter.name.length, SemanticTokensEnum.parameter, SemanticModifiersEnum.readonly);

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
        Index += Value.offset;

        Builder.Add(Value.offset, Index, SemanticTokensEnum.namespace, SemanticModifiersEnum.readonly);
        Builder.Add(Index + 1, Value.text.length - (Index + 1), SemanticTokensEnum.method, SemanticModifiersEnum.readonly);
      } else {
        Builder.AddWord(Value, SemanticTokensEnum.type, SemanticModifiersEnum.readonly);
      }
      break;

    default:
      CreateRangeTokens(Value, Builder);
      break;
  }
}
