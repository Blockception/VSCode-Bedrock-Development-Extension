import { Entity } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/BehaviorPack/Types/Entity/Entity";
import { GetFilename } from "../../../Code/File";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { CompletionBuilder } from "../../../Completion/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

/**
 *
 * @param context
 */
export function ProvideCompletion(context: CommandCompletionContext): void {
  let receiver = context.receiver;

  receiver.AddFromRange(Database.ProjectData.BehaviorPacks.entities, generateDocumentation, Kinds.Completion.Entity);
}

/**
 *
 * @param context
 */
export function ProvideCompletionTest(context: CommandCompletionContext | CompletionBuilder): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(context)) receiver = context.receiver;
  else receiver = context;

  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    let Name = entity.id;

    receiver.Add(Name, "test for the entity: " + Name, Kinds.Completion.Entity);
    receiver.Add("!" + Name, "test not for the entity: " + Name, Kinds.Completion.Entity);
  });
}

/**
 *
 * @param item
 * @returns
 */
function generateDocumentation(item: Entity): string | undefined {
  const filename = GetFilename(item.location.uri);

  return `The custom entity: ${item.id}\nlocated: ${filename}`;
}
