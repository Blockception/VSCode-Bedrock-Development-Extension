import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { Kinds } from "../Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  context.receiver.Generate(
    Database.ProjectData.ResourcePacks.sounds, 
    (item: Identifiable) => `The custom sound definition: '${item.id}'`, 
    Kinds.Completion.Sound);
}
