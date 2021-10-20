import { Command, ParameterType } from "bc-minecraft-bedrock-command";
import { Selector } from "bc-minecraft-bedrock-types/lib/src/Minecraft/Selector";

export function GetPossibleEntityTypes(command: Command, maxIndex: number): string[] {
  const data = command.getBestMatch();
  const out: string[] = [];

  for (let I = 0; I < data.length; I++) {
    const data_item = data[I];

    const max = Math.min(data_item.parameters.length, maxIndex - 1);
    for (let J = 0; J < max; J++) {
      const p = data_item.parameters[J];

      switch (p.type) {
        case ParameterType.entity:
          out.push(command.parameters[J].text);
          break;

        case ParameterType.selector:
          out.push(...Selector.getAttribute("type", command.parameters[J].text));
          break;
      }
    }
  }

  return out;
}
