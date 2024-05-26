import { Command, ParameterType } from "bc-minecraft-bedrock-command";
import { Selector } from "../../General";

/**
 * Tries to determine the possible type of the entity in a command
 * @param command The command to check
 * @param maxIndex The max index to check
 * @returns The possible type of the entity
 */
export function GetPossibleEntityTypes(command: Command, maxIndex: number): string[] {
  const data = command.getBestMatch();
  const out: string[] = [];

  for (let I = 0; I < data.length; I++) {
    const data_item = data[I];

    const max = Math.min(data_item.parameters.length, maxIndex);
    for (let J = 0; J < max; J++) {
      const p = data_item.parameters[J];

      switch (p.type) {
        case ParameterType.entity:
          out.push(command.parameters[J].text);
          break;

        case ParameterType.selector:
          const item = Selector.getAttribute("type", command.parameters[J].text);

          if (item) out.push(...item);
          break;
      }
    }
  }

  return out;
}

export function GetPossibleBlockID(command: Command, maxIndex: number): string | undefined {
  const data = command.getBestMatch();

  for (let I = 0; I < data.length; I++) {
    const data_item = data[I];

    const max = Math.min(data_item.parameters.length, maxIndex);
    for (let J = 0; J < max; J++) {
      const p = data_item.parameters[J];

      switch (p.type) {
        case ParameterType.block:
          return command.parameters[J].text;
      }
    }
  }

  return undefined;
}
