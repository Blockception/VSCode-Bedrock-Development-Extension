import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;
  let data = Context.doc.getConfiguration();

  receiver.AddFromRange(Database.ProjectData.General.Objectives, Kinds.Completion.Objectives);
  data.defintions.objective.defined.forEach((objective) => receiver.Add(objective, "The defined objective: " + objective, CompletionItemKind.Value));
}

export function ProvideCompletionPost(Context: CommandCompletionContext | CompletionBuilder, additionalText: string): void {
  let receiver: CompletionBuilder;

  if (CommandCompletionContext.is(Context)) {
    let data = Context.doc.getConfiguration();
    data.defintions.objective.defined.forEach((objective) => receiver.Add(objective, "The defined objective: " + objective, CompletionItemKind.Value));

    receiver = Context.receiver;
  } else receiver = Context;

  Database.ProjectData.General.Objectives.ForEach((objective) => {
    let Name = objective.id;

    receiver.Add(Name, objective.Documentation, Kinds.Completion.Objectives, Name + additionalText);
  });
}
