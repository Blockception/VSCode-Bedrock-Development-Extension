import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../Database/Database";
import { Kinds } from "../../../Minecraft/General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  context.receiver.Generate(
    Database.ProjectData.BehaviorPacks.animation_controllers, 
    (item: Identifiable) => `The bp animation controller: ${item.id}`, 
    Kinds.Completion.AnimationControllers);
}
