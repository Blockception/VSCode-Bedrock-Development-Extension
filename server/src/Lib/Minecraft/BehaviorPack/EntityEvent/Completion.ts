import { ParameterType } from "bc-minecraft-bedrock-command";
import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { BehaviorPack } from "bc-minecraft-bedrock-project";

/**
 *
 * @param context
 * @returns
 */
export function ProvideCompletion(context: CommandCompletionContext): void {
  const parameters = context.bestMatch.parameters;
  const Index = parameters.findIndex((p) => p.type === ParameterType.entity);

  if (Index >= 0) {
    const EntityID = parameters[Index].text;
    let Entity = Database.ProjectData.BehaviorPacks.entities.get(EntityID);

    if (Entity) {
      Convert(Entity, context.receiver);
      return;
    }
  }

  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => Convert(entity, context.receiver));
}

function Convert(Entity: BehaviorPack.Entity.Entity, builder: CompletionBuilder): void {
  Entity.events.forEach((event) => {
    builder.Add(event, `The entity: ${Entity.id} event: ${event}`, CompletionItemKind.Event);
  });
}
