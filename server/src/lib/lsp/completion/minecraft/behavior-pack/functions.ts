import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { Kinds } from "../../../../constants/kinds";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The mcfunction: ${item.id}}`;

  //Project data
  context.builder.generate(context.database.ProjectData.behaviorPacks.functions, generateDoc, Kinds.Completion.Functions);

  //No vanilla data
}
