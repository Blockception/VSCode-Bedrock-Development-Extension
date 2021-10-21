import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The bp animation controller: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.animation_controllers, generateDoc, Kinds.Completion.AnimationControllers);
}
