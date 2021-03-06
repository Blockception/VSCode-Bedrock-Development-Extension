import { CompletionItemKind } from "vscode-languageserver-types";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { MCCommandParameterType } from "../../Commands/Parameter/ParameterType";
import { Entity } from "../Entity/Entity";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let Index = Context.BestMatch.Command.getIndexOfTypeReverse(MCCommandParameterType.entity, Context.ParameterIndex);

  if (Index >= 0) {
    let EntityID = Context.Command.Parameters[Index].text;
    let Entity = Database.Data.General.Entities.GetFromID(EntityID);

    if (Entity) {
      Convert(Entity, Context.receiver);
      return;
    }
  }

  Database.Data.General.Entities.ForEach((entity) => Convert(entity, Context.receiver));
}

function Convert(Entity: Entity, builder: CompletionBuilder): void {
  Entity.Events.forEach((event) => {
    builder.Add(event, `The entity: ${Entity.Identifier} event: ${event}`, CompletionItemKind.Event);
  });
}
