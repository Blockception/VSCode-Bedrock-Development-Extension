import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const builder = context.builder;

  MinecraftData.General.Effects.forEach((effect) => {
    builder.add({label:effect, documentation: `The vanilla minecraft effect: '${effect}'`, kind: Kinds.Completion.Effect});
  });
}
