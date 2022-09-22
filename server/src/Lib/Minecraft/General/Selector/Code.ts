import { Minecraft } from "bc-minecraft-bedrock-types";
import { CompactJson, CompactJsonReader } from "bc-minecraft-bedrock-types/lib/src/Minecraft/Json";

export function getAttribute(attr: string, selector: string): string[] {
  const sel = Minecraft.Selector.Selector.parse(selector);
  if (sel === undefined) return [];

  const types = sel.get(attr).map(castToString);

  return types;
}

function castToString(attr: CompactJsonReader<CompactJson.IKeyNode>): string {
  if (attr.isString()) {
    return attr.value as string;
  }

  return "";
}
