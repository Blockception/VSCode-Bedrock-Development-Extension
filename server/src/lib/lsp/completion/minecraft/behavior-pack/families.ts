import { Defined } from "bc-minecraft-bedrock-project";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../constants";
import { GetPossibleEntityTypes } from "../../../../minecraft/commands";
import { IsEducationEnabled } from "../../../../project/attributes";
import { Context } from "../../../context/context";
import { CompletionBuilder } from "../../builder/builder";
import { CommandCompletionContext, CompletionContext } from "../../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
    const generateDoc = (item: string) => `The entity family: ${item} from: ${entity.id}`;

    context.builder.generate(entity.families, generateDoc, Kinds.Completion.Family);
  });

  //Vanilla data
  context.builder.generate(
    MinecraftData.General.Entities.families,
    (item) => `The vanilla entity family: ${item}`,
    Kinds.Completion.Family
  );
}

export function provideCompletionTest(context: Context<CommandCompletionContext>): void {
  const builder = context.builder;

  const types = GetPossibleEntityTypes(context.command, context.parameterIndex);
  const edu = IsEducationEnabled(context.document);

  if (types.length === 0) {
    context.database.ProjectData.behaviorPacks.entities.forEach((entity) => convertTestEntity(entity, builder));

    MinecraftData.General.Entities.families.forEach((family) => {
      builder.add({
        label: family,
        documentation: `Test for the vanilla family: ${family}`,
        kind: Kinds.Completion.Family,
      });
      builder.add({
        label: "!" + family,
        documentation: `Test not for the vanilla family: ${family}`,
        kind: Kinds.Completion.Family,
      });
    });
  } else {
    types.forEach((type) => {
      const entity = context.database.ProjectData.behaviorPacks.entities.get(type);
      if (entity) convertTestEntity(entity, builder);

      const vanilla_entity = MinecraftData.BehaviorPack.getEntity(type, edu);
      if (vanilla_entity) convertTestEntity(vanilla_entity, builder);
    });
  }
}

interface Families {
  id: string;
  families: Defined | string[];
}

function convertTestEntity(entity: Families, receiver: CompletionBuilder) {
  const families = Array.isArray(entity.families) ? entity.families : entity.families.defined;

  families.forEach((family) => {
    receiver.add({
      label: family,
      documentation: `Test for the family: ${family}\n\rForm ${entity.id}`,
      kind: Kinds.Completion.Family,
    });
    receiver.add({
      label: "!" + family,
      documentation: `Test not for the family: ${family}\n\rForm ${entity.id}`,
      kind: Kinds.Completion.Family,
    });
  });
}
