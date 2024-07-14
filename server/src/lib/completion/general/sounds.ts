import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { SimpleContext } from "../../Code/SimpleContext";
import { CompletionBuilder } from "../builder/builder";
import { Database } from "../../Database/Database";
import { Kinds } from "../../Minecraft/General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  context.receiver.generate(
    Database.ProjectData.ResourcePacks.sounds, 
    (item: Identifiable) => `The custom sound definition: '${item.id}'`, 
    Kinds.Completion.Sound);
}
