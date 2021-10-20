import { Selector, SelectorAttribute } from "bc-minecraft-bedrock-types/lib/src/Minecraft/include";
import { OffsetWord } from "bc-vscode-words";
import { McfunctionSemanticTokensBuilder } from "../../../Semantics/Builders/McfunctionSemanticTokensBuilder";
import { CreateNamespaced, CreateRangeTokensWord } from "../../../Semantics/Functions";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../../../Semantics/Legend";

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
    const parameter = Parameters[I];

    CreateTokens(parameter, Builder);
  }
}

function ProcessScoreParameters(Parameters: SelectorAttribute[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];

    const Name = new OffsetWord(parameter.name, parameter.offset);
    const Value = new OffsetWord(parameter.value, Name.offset + Name.text.length + 1);
    CreateRangeTokensWord(Value, Builder);
  }
}

function CreateTokens(Parameter: SelectorAttribute, Builder: McfunctionSemanticTokensBuilder): void {
  //process header
  const Name = new OffsetWord(Parameter.name, Parameter.offset);
  const Value = new OffsetWord(Parameter.value, Name.offset + Name.text.length + 1);

  //property name
  Builder.AddWord(Name, SemanticTokensEnum.parameter, SemanticModifiersEnum.readonly);
  Builder.Add(Parameter.offset, Parameter.offset + Parameter.name.length, SemanticTokensEnum.parameter, SemanticModifiersEnum.readonly);

  if (Value.text === "") return;

  switch (Name.text) {
    case "name":
      Builder.AddWord(Value, SemanticTokensEnum.string);
      break;

    case "tag":
      Builder.AddWord(Value, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);
      break;

    case "type":
      CreateNamespaced(Value, Builder);
      break;

    default:
      CreateRangeTokensWord(Value, Builder);
      break;
  }
}
