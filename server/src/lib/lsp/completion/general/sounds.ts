import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { CompletionContext } from "../context";
import { Context } from "../../context/context";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: Context<CompletionContext>): void {
  context.builder.generate(
    context.database.ProjectData.resourcePacks.sounds, 
    (item: Identifiable) => `The custom sound definition: '${item.id}'`, 
    Kinds.Completion.Sound);
}
