import { Kinds } from "../../../../../constants/kinds";
import { SimpleContext } from "../../../../../util";
import { Database } from '../../../../database';
import { CompletionBuilder } from "../../../builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  context.projectData.BehaviorPacks.entities.forEach((entity) => {
    const generateDoc = (group: string) => `The entity componen group: ${group} from ${entity.id}`;
    builder.generate(entity.groups, generateDoc);
  });
}
