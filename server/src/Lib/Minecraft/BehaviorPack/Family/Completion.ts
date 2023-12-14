import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Context";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

import * as Command from "../../Commands/Command/Functions";

export function provideCompletion(context: CommandCompletionContext, type: string | undefined = undefined): void {
  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    const generateDoc = (item: string) => `The entity family: ${item} from: ${entity.id}`;

    context.receiver.GenerateStr(entity.families, generateDoc, Kinds.Completion.Family);
  });

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.General.Entities.families, (item) => `The vanilla entity family: ${item}`, Kinds.Completion.Family);
}

export function provideCompletionTest(context: CommandCompletionContext): void {
  const receiver = context.receiver;

  const types = Command.GetPossibleEntityTypes(context.command, context.parameterIndex);
  const edu = IsEducationEnabled(context.doc);

  if (types.length === 0) {
    Database.ProjectData.BehaviorPacks.entities.forEach((entity) => ConvertTestEntity(entity, receiver));

    MinecraftData.General.Entities.families.forEach((family) => {
      receiver.Add(family, `Test for the vanilla family: ${family}`, Kinds.Completion.Family);
      receiver.Add("!" + family, `Test not for the vanilla family: ${family}`, Kinds.Completion.Family);
    });
  } else {
    types.forEach((type) => {
      const entity = Database.ProjectData.BehaviorPacks.entities.get(type);
      if (entity) ConvertTestEntity(entity, receiver);

      const vanilla_entity = MinecraftData.ResourcePack.getEntity(type, edu);
      if (vanilla_entity) ConvertTestEntity(vanilla_entity, receiver);
    });
  }
}

function ConvertTestEntity(entity: { families?: string[]; id: string }, receiver: CompletionBuilder) {
  entity.families?.forEach((family) => {
    receiver.Add(family, `Test for the family: ${family}\n\dForm ${entity.id}`, Kinds.Completion.Family);
    receiver.Add("!" + family, `Test not for the family: ${family}\n\dForm ${entity.id}`, Kinds.Completion.Family);
  });
}
