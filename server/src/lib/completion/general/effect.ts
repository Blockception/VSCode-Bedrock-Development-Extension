import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../Minecraft/General/Kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;

  MinecraftData.General.Effects.forEach((effect) => {
    receiver.add(effect, `The vanilla minecraft effect: '${effect}'`, Kinds.Completion.Effect);
  });
}
