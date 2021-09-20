import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";

export function ProvideCompletion(context: CommandCompletionContext, type: string | undefined = undefined): void {
  //TODO redo
  /*let data = context.doc.getConfiguration();
  let receiver = context.receiver;

  data.definitions.family.defined.forEach((family) => {
    receiver.Add(family, "The defined family: " + family, CompletionItemKind.Value);
  });

  if (type) {
    let entity = Database.ProjectData.BehaviorPacks.entities.GetFromID(type);

    if (entity) {
      ConvertEntity(entity, receiver);
    }
  } else {
    Database.ProjectData.BehaviorPacks.entities.forEach((entity) => ConvertEntity(entity, receiver));
  }*/
}

/*
function ConvertEntity(entity: Entity.Entity, receiver: CompletionBuilder) {
  entity.Families.forEach((family) => {
    receiver.Add(family, "The entity family: " + family, Kinds.Completion.Family);
  });
}
*/

export function ProvideCompletionTest(context: CommandCompletionContext | CompletionBuilder, type: string | undefined = undefined): void {
  //TODO redo
  /*let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(context)) receiver = context.receiver;
  else receiver = context;

  if (type) {
    let entity = Database.ProjectData.BehaviorPacks.entities.GetFromID(type);

    if (entity) {
      ConvertTestEntity(entity, receiver);
    }
  } else {
    Database.ProjectData.BehaviorPacks.entities.forEach((entity) => ConvertTestEntity(entity, receiver));
  }*/
}
/*
function ConvertTestEntity(entity: Entity.Entity, receiver: CompletionBuilder) {
  entity.Families.forEach((family) => {
    receiver.Add(family, "test for the Family: " + family, Kinds.Completion.Family);
    receiver.Add("!" + family, "test not for the Family: " + family, Kinds.Completion.Family);
  });
}*/
