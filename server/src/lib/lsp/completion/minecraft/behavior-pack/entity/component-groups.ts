import { Kinds } from "../../../../../constants/kinds";
import { SimpleContext } from "../../../../../util";
import { Database } from '../../../../database';
import { CompletionBuilder } from "../../../builder";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const receiver = context.receiver.withDefaults({ kind: Kinds.Completion.Animation });

  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    const generateDoc = (group: string) => `The entity componen group: ${group} from ${entity.id}`;
    receiver.generate(entity.groups, generateDoc);
  });
}
