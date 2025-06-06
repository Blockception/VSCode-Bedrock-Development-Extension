import { Identifiable } from "bc-minecraft-bedrock-types/lib/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../constants";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
import { JsonPathCompletion, JsonPathMatch } from '../../builder';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The item definition: ${item.id}`;
  const builder = context.builder;

  //Project data
  builder.generate(context.database.ProjectData.behaviorPacks.items, generateDoc, Kinds.Completion.Item);

  //spawn_eggs
  context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
    builder.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
  });

  //Vanilla data
  builder.generate(MinecraftData.vanilla.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

  //spawn_eggs
  MinecraftData.vanilla.BehaviorPack.entities.forEach((entity) => {
    builder.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
  });

  //Education data
  if (IsEducationEnabled(context.document)) {
    //Vanilla data
    builder.generate(MinecraftData.edu.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

    //spawn_eggs
    MinecraftData.edu.BehaviorPack.entities.forEach((entity) => {
      builder.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
    });
  }

  //Custom block items
  builder.generate(
    context.database.ProjectData.behaviorPacks.blocks,
    (item: Identifiable) => `The block-item definition: ${item.id}`,
    Kinds.Completion.Block
  );
}

export function provideJsonCompletion(context: Context<CompletionContext>) {
  return itemJsonCompletion.onCompletion(context);
}

const itemJsonCompletion = new JsonPathCompletion(
  JsonPathMatch.create("minecraft:icon/texture", provideCompletion)
)