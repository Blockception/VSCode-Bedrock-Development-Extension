import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/builder/builder";
import { Database } from "../../../Database/Database";
import { Kinds } from "../../General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The bp animation: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.animations, generateDoc, Kinds.Completion.Animation);
}
