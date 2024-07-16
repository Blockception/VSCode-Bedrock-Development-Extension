import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../constants/kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;

  MinecraftData.General.Effects.forEach((effect) => {
    receiver.add({label:effect, documentation: `The vanilla minecraft effect: '${effect}'`, kind: Kinds.Completion.Effect});
  });
}
