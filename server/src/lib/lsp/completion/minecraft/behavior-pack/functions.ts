import { Identifiable } from "bc-minecraft-bedrock-types/lib/types/identifiable";
import { Kinds } from "../../../../constants";
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The mcfunction: ${item.id}}`;

  //Project data
  context.builder.generate(context.database.projectData.behaviorPacks.functions, generateDoc, Kinds.Completion.Functions);

  //No vanilla data
}
