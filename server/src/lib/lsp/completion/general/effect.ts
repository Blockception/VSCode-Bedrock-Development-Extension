import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../constants";
import { CommandCompletionContext } from "../context";

export function provideCompletion(context: CommandCompletionContext): void {
  const builder = context.builder;

  MinecraftData.General.Effects.forEach((effect) => {
    builder.add({
      label: effect,
      documentation: `The vanilla minecraft effect: '${effect}'`,
      kind: Kinds.Completion.Effect,
    });
  });
}
