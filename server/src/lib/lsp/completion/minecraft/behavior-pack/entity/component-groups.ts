import { Kinds } from "../../../../../constants";
import { Context } from "../../../../context/context";
import { CompletionContext } from "../../../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
    const generateDoc = (group: string) => `The entity componen group: ${group} from ${entity.id}`;
    builder.generate(entity.groups, generateDoc);
  });
}
