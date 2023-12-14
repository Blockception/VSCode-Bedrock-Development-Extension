import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CommandCompletionContext } from "../../../Completion/Context";
import { Kinds } from "../Kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;

  MinecraftData.General.Effects.forEach((effect) => {
    receiver.Add(effect, `The vanilla minecraft effect: '${effect}'`, Kinds.Completion.Effect);
  });
}
