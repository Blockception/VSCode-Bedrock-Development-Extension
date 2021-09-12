import { Sound } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/ResourcePack/include";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;

  //TODO
  receiver.AddFromRange<Sound.Sound>(Database.ProjectData.ResourcePacks.sounds, GenerateSound, Kinds.Completion.Sound);
}

function GenerateSound(item: Sound.Sound): string {
  return `The custom sound definition: '${item.id}'`;
}
