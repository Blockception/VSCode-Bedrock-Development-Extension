import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The item definition: ${item.id}`;
  const receiver = context.receiver;

  //Project data
  receiver.Generate(Database.ProjectData.BehaviorPacks.items, generateDoc, Kinds.Completion.Item);

  //spawn_eggs
  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    receiver.Add(entity.id + "_spawn_egg", "The spawn egg for entity: " + entity.id, Kinds.Completion.Entity);
  });

  //Vanilla data
  receiver.Generate(MinecraftData.vanilla.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

  //spawn_eggs
  MinecraftData.vanilla.BehaviorPack.entities.forEach((entity) => {
    receiver.Add(entity.id + "_spawn_egg", "The spawn egg for entity: " + entity.id, Kinds.Completion.Entity);
  });

  //Education data
  if (IsEducationEnabled(context.doc)) {
    //Vanilla data
    receiver.Generate(MinecraftData.edu.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

    //spawn_eggs
    MinecraftData.edu.BehaviorPack.entities.forEach((entity) => {
      receiver.Add(entity.id + "_spawn_egg", "The spawn egg for entity: " + entity.id, Kinds.Completion.Entity);
    });
  }

  //Custom block items
  receiver.Generate(
    Database.ProjectData.BehaviorPacks.blocks,
    (item: Identifiable) => `The block-item definition: ${item.id}`,
    Kinds.Completion.Block
  );
}
