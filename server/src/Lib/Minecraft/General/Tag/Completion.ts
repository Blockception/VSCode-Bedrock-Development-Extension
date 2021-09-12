import { GeneralInfo } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/General/Types/GeneralInfo";
import { CompletionItemKind } from "vscode-languageserver";
import { GetFilename } from "../../../Code/include";
import { CommandCompletionContext } from "../../../Completion/Commands/context";
import { CompletionBuilder } from "../../../Completion/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const data = context.doc.getConfiguration();

  data.definitions["tag"]?.defined.forEach((tag) => receiver.Add(tag, "The defined tag: " + tag, CompletionItemKind.Value));

  receiver.AddFromRange(Database.ProjectData.General.tags, generateDocumentation, Kinds.Completion.Tag);
}

function generateDocumentation(fakeEntities: GeneralInfo): string | undefined {
  const filename = GetFilename(fakeEntities.location.uri);

  return `The dummy entity: ${fakeEntities.id}\nLocation: ${filename}`;
}

export function ProvideCompletionTest(context: CommandCompletionContext | CompletionBuilder): void {
  let data = context.doc.getConfiguration();
  data.definitions.tag.defined.forEach((tag) => receiver.Add(tag, "The defined tag: " + tag, CompletionItemKind.Value));
  let receiver = CommandCompletionContext.is(context) ? context.receiver : context;

  Database.ProjectData.General.tags.forEach((tag) => {
    receiver.Add(tag.id, `Tests for the tag: '${tag.id}'`, Kinds.Completion.Tag);
    receiver.Add("!" + tag.id, `Tests not for the tag: '${tag.id}'`, Kinds.Completion.Tag);
  });
}
