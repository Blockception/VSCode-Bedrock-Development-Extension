import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const GenerateDoc = (item: Identifiable) => `The custom sound definition: '${item.id}'`;

  context.receiver.Generate(Database.ProjectData.ResourcePacks.sounds, GenerateDoc, Kinds.Completion.Sound);
}
