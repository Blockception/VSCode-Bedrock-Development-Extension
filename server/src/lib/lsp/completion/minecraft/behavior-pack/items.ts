import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The item definition: ${item.id}`;
  const builder = context.builder;

  //Project data
  builder.generate(context.projectData.BehaviorPacks.items, generateDoc, Kinds.Completion.Item);

  //spawn_eggs
  context.projectData.BehaviorPacks.entities.forEach((entity) => {
    builder.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
  });

  //Vanilla data
  builder.generate(MinecraftData.vanilla.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

  //spawn_eggs
  MinecraftData.vanilla.BehaviorPack.entities.forEach((entity) => {
    builder.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
  });

  //Education data
  if (IsEducationEnabled(context.doc)) {
    //Vanilla data
    builder.generate(MinecraftData.edu.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

    //spawn_eggs
    MinecraftData.edu.BehaviorPack.entities.forEach((entity) => {
      builder.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
    });
  }

  //Custom block items
  builder.generate(
    context.projectData.BehaviorPacks.blocks,
    (item: Identifiable) => `The block-item definition: ${item.id}`,
    Kinds.Completion.Block
  );
}
