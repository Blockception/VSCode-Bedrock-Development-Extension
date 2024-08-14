import { ParameterType } from "bc-minecraft-bedrock-command";
import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../../constants";
import { Context } from "../../../../context/context";
import { CompletionBuilder } from "../../../builder/builder";
import { CommandCompletionContext, CompletionContext } from "../../../context";

/**
 *
 * @param context
 * @returns
 */
export function provideCompletion(context: Context<CommandCompletionContext> | Context<CompletionContext>): void {
  const { builder, database } = context;

  if (CommandCompletionContext.is(context)) {
    const parameters = context.bestMatch.parameters;
    const Index = parameters.findIndex((p) => p.type === ParameterType.entity);

    if (Index >= 0) {
      const EntityID = parameters[Index].text;
      const Entity = database.ProjectData.behaviorPacks.entities.get(EntityID);

      if (Entity) {
        Convert(Entity, builder);
        return;
      }
    }
  }

  database.ProjectData.behaviorPacks.entities.forEach((entity) => Convert(entity, builder));

  const generateDoc = (item: string) => `The vanilla entity event: ${item}`;
  builder.generate(MinecraftData.General.Entities.events, generateDoc, Kinds.Completion.Event);
}

/**
 *
 * @param Entity
 * @param builder
 */
function Convert(Entity: BehaviorPack.Entity.Entity, builder: CompletionBuilder): void {
  const generateDoc = (item: string) => `The entity event: ${item}\nFrom: ${Entity.id}`;

  builder.generate(Entity.events, generateDoc, Kinds.Completion.Event);
}
