import { Minecraft } from "bc-minecraft-bedrock-types";
import { OffsetWord } from "bc-vscode-words";
import { McfunctionSemanticTokensBuilder } from "../../../Semantics/Builders/McfunctionSemanticTokensBuilder";
import { CreateNamespaced, CreateRangeTokensWord } from "../../../Semantics/Functions";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../../../Semantics/Legend";
import { Kinds } from "../Kinds";

export function CreateSelectorTokens(word: OffsetWord, Builder: McfunctionSemanticTokensBuilder): void {
  if (word.text.startsWith("@")) {
    const sel = Minecraft.Selector.Selector.parse(word.text, word.offset);

    Builder.Add(word.offset, word.offset + 2, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);

    ProcessParameters(sel.attributes, Builder);
  } else {
    Builder.AddWord(word, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);
  }
}

function ProcessParameters(Parameters: Minecraft.Selector.SelectorAttribute[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    const parameter = Parameters[I];

    switch (parameter.name) {
      case "scores":
        Builder.AddWord(parameter.getName(), Kinds.Symbol.Objectives, SemanticModifiersEnum.readonly);
        if (parameter instanceof Minecraft.Selector.SelectorScoreAttribute) ProcessScoreParameters(parameter.values, Builder);
        break;

      case "hasitem":
        Builder.AddWord(parameter.getName(), Kinds.Symbol.Item, SemanticModifiersEnum.readonly);
        if (parameter instanceof Minecraft.Selector.SelectorItemAttribute) ProcessHasItemParameters(parameter.values, Builder);
        break;

      default:
        if (parameter instanceof Minecraft.Selector.SelectorValueAttribute) CreateTokens(parameter, Builder);
        break;
    }
  }
}

function ProcessScoreParameters(Parameters: Minecraft.Selector.SelectorValueAttribute[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];

    const Name = new OffsetWord(parameter.name, parameter.offset);
    Builder.AddWord(Name, Kinds.Symbol.Objectives, SemanticModifiersEnum.readonly);

    const Value = new OffsetWord(parameter.value, Name.offset + Name.text.length + 1);
    CreateRangeTokensWord(Value, Builder);
  }
}

function CreateTokens(Parameter: Minecraft.Selector.SelectorValueAttribute, Builder: McfunctionSemanticTokensBuilder): void {
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

function ProcessHasItemParameters(Parameters: Minecraft.Selector.SelectorValueAttribute[], Builder: McfunctionSemanticTokensBuilder): void {
  for (let I = 0; I < Parameters.length; I++) {
    let parameter = Parameters[I];

    const Name = new OffsetWord(parameter.name, parameter.offset);
    const Value = new OffsetWord(parameter.value, Name.offset + Name.text.length + 1);

    switch (Name.text) {
      case "item":
        Builder.AddWord(Name, Kinds.Symbol.Item, SemanticModifiersEnum.readonly);
        CreateNamespaced(Value, Builder);
        break;

      case "slot":
      case "location":
        Builder.AddWord(Name, SemanticTokensEnum.enumMember);
        break;

      case "data":
      case "quantity":
      default:
        Builder.AddWord(Name, Kinds.Symbol.Integer, SemanticModifiersEnum.readonly);
        CreateRangeTokensWord(Value, Builder);
        break;
    }
  }
}
