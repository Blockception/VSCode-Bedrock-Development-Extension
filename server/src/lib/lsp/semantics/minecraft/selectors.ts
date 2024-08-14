import { Minecraft } from "bc-minecraft-bedrock-types";
import { CompactJson } from "bc-minecraft-bedrock-types/lib/src/minecraft/json";
import { OffsetWord } from "bc-vscode-words";
import { McfunctionSemanticTokensBuilder } from "../builders/mcfunction";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../constants";
import { CreateNamespaced, CreateRangeTokensWord } from "../functions";

export function CreateSelectorTokens(word: OffsetWord, builder: McfunctionSemanticTokensBuilder): void {
  if (word.text.startsWith("@")) {
    const sel = Minecraft.Selector.Selector.parse(word.text, word.offset);
    if (sel === undefined) return;

    builder.Add(word.offset, word.offset + 2, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);

    sel.forEach((attr) => {
      ProcessParameters(attr, builder);
    });
  } else {
    builder.AddWord(word, SemanticTokensEnum.enumMember, SemanticModifiersEnum.static);
  }
}

function ProcessParameters(
  parameter: Minecraft.Json.CompactJsonReader<CompactJson.INode>,
  builder: McfunctionSemanticTokensBuilder
): void {
  const key = parameter.key || "";
  const offset = parameter.offset;

  const name = new OffsetWord(key, parameter.offset);

  if (CompactJson.hasKey(parameter)) {
    builder.AddWord(name, SemanticTokensEnum.parameter, SemanticModifiersEnum.readonly);
    builder.Add(offset, offset + key.length, SemanticTokensEnum.parameter, SemanticModifiersEnum.readonly);
  }

  if (parameter.isArrayOrObject()) {
    parameter.forEach((attr) => ProcessParameters(attr, builder));
    return;
  }
  if (!parameter.isString()) {
    return;
  }

  const value = CompactJson.valueToOffsetWord(parameter);

  switch (key) {
    case "name":
      builder.AddWord(value, SemanticTokensEnum.string);
      break;

    case "tag":
      builder.AddWord(value, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);
      break;

    case "type":
      CreateNamespaced(value, builder);
      break;

    case "item":
      builder.AddWord(name, SemanticTokensEnum.property, SemanticModifiersEnum.readonly);
      CreateNamespaced(value, builder);
      break;

    case "slot":
    case "location":
      builder.AddWord(name, SemanticTokensEnum.enumMember);
      break;

    case "data":
    case "quantity":
    default:
      CreateRangeTokensWord(value, builder);
      break;
  }
}
