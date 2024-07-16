import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../../database/database";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The item definition: ${item.id}`;
  const receiver = context.receiver;

  //Project data
  receiver.generate(Database.ProjectData.BehaviorPacks.items, generateDoc, Kinds.Completion.Item);

  //spawn_eggs
  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    receiver.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
  });

  //Vanilla data
  receiver.generate(MinecraftData.vanilla.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

  //spawn_eggs
  MinecraftData.vanilla.BehaviorPack.entities.forEach((entity) => {
    receiver.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
  });

  //Education data
  if (IsEducationEnabled(context.doc)) {
    //Vanilla data
    receiver.generate(MinecraftData.edu.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

    //spawn_eggs
    MinecraftData.edu.BehaviorPack.entities.forEach((entity) => {
      receiver.add({ label:entity.id + "_spawn_egg", documentation: "The spawn egg for entity: " + entity.id, kind: Kinds.Completion.Entity});
    });
  }

  //Custom block items
  receiver.generate(
    Database.ProjectData.BehaviorPacks.blocks,
    (item: Identifiable) => `The block-item definition: ${item.id}`,
    Kinds.Completion.Block
  );
}
