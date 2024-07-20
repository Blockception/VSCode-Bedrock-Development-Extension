import { ParameterType } from "bc-minecraft-bedrock-command";
import { CompletionBuilder } from "../../../builder/builder";
import { CommandCompletionContext } from "../../../builder/context";
import { Database } from "../../../../database/database";
import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../../../util/simple-context";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from '../../../../../constants/kinds';

/**
 *
 * @param context
 * @returns
 */
export function provideCompletion(context: CommandCompletionContext | SimpleContext<CompletionBuilder>): void {
  if (CommandCompletionContext.is(context)) {
    const parameters = context.bestMatch.parameters;
    const Index = parameters.findIndex((p) => p.type === ParameterType.entity);

    if (Index >= 0) {
      const EntityID = parameters[Index].text;
      const Entity = Database.ProjectData.BehaviorPacks.entities.get(EntityID);

      if (Entity) {
        Convert(Entity, context.builder);
        return;
      }
    }
  }

  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => Convert(entity, context.builder));

  const generateDoc = (item: string) => `The vanilla entity event: ${item}`;
  context.builder.generate(MinecraftData.General.Entities.events, generateDoc, Kinds.Completion.Event);
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
