import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { CompletionItemKind } from "vscode-languageserver";
import { GetFilename } from "../../../Code/include";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: CommandCompletionContext): void {
  let receiver = context.receiver;
  let data = context.doc.getConfiguration();

  receiver.AddFromRange(Database.ProjectData.General.objectives, generateDocumentation, Kinds.Completion.Objectives);
  data.definitions.objective?.defined.forEach((objective) => receiver.Add(objective, "The defined objective: " + objective, CompletionItemKind.Value));
}

function generateDocumentation(item: GeneralInfo): string {
  const filename = GetFilename(item.location.uri);

  return `The objective: ${item.id}\nLocation: ${filename}`;
}

export function ProvideCompletionPost(context: CommandCompletionContext | CompletionBuilder, additionalText: string): void {
  let receiver: CompletionBuilder;

  if (CommandCompletionContext.is(context)) {
    let data = context.doc.getConfiguration();
    data.definitions.objective?.defined.forEach((objective) => receiver.Add(objective, "The defined objective: " + objective, CompletionItemKind.Value));

    receiver = context.receiver;
  } else receiver = context;

  Database.ProjectData.General.objectives.forEach((objective) => {
    let Name = objective.id;

    receiver.Add(Name, objective.documentation ?? generateDocumentation(objective), Kinds.Completion.Objectives, Name + additionalText);
  });
}
