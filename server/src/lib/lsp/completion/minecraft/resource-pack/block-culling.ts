import { SimpleContext } from "../../../../util";
import { CompletionBuilder, JsonPathCompletion } from "../../builder";
import { Database } from "../../../../lsp/database";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Block });

  builder.generate(Database.ProjectData.ResourcePacks.block_culling_rules, (bc) => `Block culling defined by ${bc.id}`);
}

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
  return blockCullingRPJsonCompletion.onCompletion(context);
}

const blockCullingRPJsonCompletion = new JsonPathCompletion({
  match: (item) => item.endsWith("/bone"),
  onCompletion: (context: SimpleContext<CompletionBuilder>) => {
    const builder = context.builder.withDefaults({ kind: Kinds.Completion.Block });

    Database.ProjectData.ResourcePacks.models.forEach((model) => {
      builder.generate(model.bones, () => `Bone defined by ${model.id}`);
    });
  },
});
