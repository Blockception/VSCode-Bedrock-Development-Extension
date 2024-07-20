import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The mcfunction: ${item.id}}`;

  //Project data
  context.builder.generate(context.projectData.BehaviorPacks.functions, generateDoc, Kinds.Completion.Functions);

  //No vanilla data
}
