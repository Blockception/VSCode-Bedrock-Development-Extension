import { ParameterType } from "bc-minecraft-bedrock-command";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Context";
import { Database } from "../../../Database/Database";
import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../Code/SimpleContext";
import { Kinds } from "../../General/Kinds";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";

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
        Convert(Entity, context.receiver);
        return;
      }
    }
  }

  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => Convert(entity, context.receiver));

  const generateDoc = (item: string) => `The vanilla entity event: ${item}`;
  context.receiver.GenerateStr(MinecraftData.General.Entities.events, generateDoc, Kinds.Completion.Event);
}

/**
 *
 * @param Entity
 * @param builder
 */
function Convert(Entity: BehaviorPack.Entity.Entity, builder: CompletionBuilder): void {
  const generateDoc = (item: string) => `The entity event: ${item}\nFrom: ${Entity.id}`;

  builder.GenerateStr(Entity.events, generateDoc, Kinds.Completion.Event);
}
