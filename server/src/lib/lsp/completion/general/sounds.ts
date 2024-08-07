import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { SimpleContext } from "../../../util/simple-context";
import { CompletionBuilder } from "../builder/builder";
import { Database } from "../../../lsp/database/database";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  context.builder.generate(
    context.projectData.ResourcePacks.sounds, 
    (item: Identifiable) => `The custom sound definition: '${item.id}'`, 
    Kinds.Completion.Sound);
}
