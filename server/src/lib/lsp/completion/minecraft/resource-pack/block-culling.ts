
import { JsonPathCompletion } from "../../builder";
import { Kinds } from "../../../../constants";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Block });

  builder.generate(context.database.ProjectData.resourcePacks.block_culling_rules, (bc) => `Block culling defined by ${bc.id}`);
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return blockCullingRPJsonCompletion.onCompletion(context);
}

const blockCullingRPJsonCompletion = new JsonPathCompletion({
  match: (item) => item.endsWith("/bone"),
  onCompletion: (context: Context<CompletionContext>) => {
    const builder = context.builder.withDefaults({ kind: Kinds.Completion.Block });

    context.database.ProjectData.resourcePacks.models.forEach((model) => {
      builder.generate(model.bones, () => `Bone defined by ${model.id}`);
    });
  },
});
