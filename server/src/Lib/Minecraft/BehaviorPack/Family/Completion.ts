import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Context";
import { Database } from "../../../Database/include";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: CommandCompletionContext, type: string | undefined = undefined): void {
  Database.ProjectData.BehaviorPacks.entities.forEach((entity) => {
    const generateDoc = (item: string) => `The entity family: ${item} from: ${entity.id}`;

    context.receiver.GenerateStr(entity.families, generateDoc, Kinds.Completion.Family);
  });

  //Vanilla data
  context.receiver.GenerateStr(MinecraftData.General.Entities.families, (item) => `The vanilla entity family: ${item}`, Kinds.Completion.Family);
}

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
