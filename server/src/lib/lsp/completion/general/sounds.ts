import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Kinds } from "../../../constants";
import { Context } from "../../context/context";
import { CompletionContext } from "../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  context.builder.generate(
    context.database.ProjectData.resourcePacks.sounds, 
    (item: Identifiable) => `The custom sound definition: '${item.id}'`, 
    Kinds.Completion.Sound);
}
