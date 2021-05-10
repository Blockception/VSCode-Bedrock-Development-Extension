import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Entity } from "../include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext, type: string | undefined = undefined): void {
  let data = Context.doc.getConfiguration();
  let receiver = Context.receiver;

  data.defintions.family.defined.forEach((family) => {
    receiver.Add(family, "The defined family: " + family, CompletionItemKind.Value);
  });

  if (type) {
    let entity = Database.Data.General.Entities.GetFromID(type);

    if (entity) {
      ConvertEntity(entity, receiver);
    }
  } else {
    Database.Data.General.Entities.ForEach((entity) => ConvertEntity(entity, receiver));
  }
}

function ConvertEntity(entity: Entity.Entity, receiver: CompletionBuilder) {
  entity.Families.forEach((family) => {
    receiver.Add(family, "The entity family: " + family, Kinds.Completion.Family);
  });
}

export function ProvideCompletionTest(Context: CommandCompletionContext | CompletionBuilder, type: string | undefined = undefined): void {
  let receiver: CompletionBuilder;
  if (CommandCompletionContext.is(Context)) receiver = Context.receiver;
  else receiver = Context;

  if (type) {
    let entity = Database.Data.General.Entities.GetFromID(type);

    if (entity) {
      ConvertTestEntity(entity, receiver);
    }
  } else {
    Database.Data.General.Entities.ForEach((entity) => ConvertTestEntity(entity, receiver));
  }
}

function ConvertTestEntity(entity: Entity.Entity, receiver: CompletionBuilder) {
  entity.Families.forEach((family) => {
    receiver.Add(family, "test for the Family: " + family, Kinds.Completion.Family);
    receiver.Add("!" + family, "test not for the Family: " + family, Kinds.Completion.Family);
  });
}
