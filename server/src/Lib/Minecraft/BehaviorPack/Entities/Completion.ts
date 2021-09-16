import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/include";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The entity definition: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.entities, generateDoc, Kinds.Completion.Entity);

  //Vanilla data
  context.receiver.Generate(MinecraftData.vanilla.BehaviorPack.entities, generateDoc, Kinds.Completion.Entity);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.Generate(MinecraftData.edu.BehaviorPack.entities, generateDoc, Kinds.Completion.Entity);
}

export function ProvideEventCompletion(context: SimpleContext<CompletionBuilder>): void {
  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    const generateDoc = (item: string) => `The entity event definition: ${item} from: ${entity.id}`;

    context.receiver.GenerateStr(entity.events, generateDoc, Kinds.Completion.Event);
  });

  MinecraftData.vanilla.BehaviorPack.entities.forEach((entity) => {
    const generateDoc = (item: string) => `The vanilla entity event definition: ${item} from: ${entity.id}`;

    context.receiver.GenerateStr(entity.events, generateDoc, Kinds.Completion.Event);
  });

  //Education data
  if (IsEducationEnabled(context.doc))
    MinecraftData.edu.BehaviorPack.entities.forEach((entity) => {
      const generateDoc = (item: string) => `The vanilla entity event definition: ${item} from: ${entity.id}`;

      context.receiver.GenerateStr(entity.events, generateDoc, Kinds.Completion.Event);
    });
}

export function ProvideFamilyCompletion(context: SimpleContext<CompletionBuilder>): void {
  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    const generateDoc = (item: string) => `The entity family: ${item} from: ${entity.id}`;

    context.receiver.GenerateStr(entity.families, generateDoc, Kinds.Completion.Event);
  });

  //Vanilla data
  //TODO add vanilla family support
}
