import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../Completion/Commands/Context";
import { CompletionBuilder } from "../../../Completion/include";
import { Database } from "../../../Database/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  const receiver = Context.receiver;
  const data = Context.doc.getConfiguration();

  data.definitions["tag"]?.defined.forEach((tag) => receiver.Add(tag, "The defined tag: " + tag, CompletionItemKind.Value));

  receiver.AddFromRange(Database.ProjectData.General.tags, Kinds.Completion.Tag);
}

export function ProvideCompletionTest(Context: CommandCompletionContext | CompletionBuilder): void {
  let data = Context.doc.getConfiguration();
  data.defintions.tag.defined.forEach((tag) => receiver.Add(tag, "The defined tag: " + tag, CompletionItemKind.Value));
  let receiver = CommandCompletionContext.is(Context) ? Context.receiver : Context;

  Database.ProjectData.General.Tag.ForEach((tag) => {
    receiver.Add(tag.id, `Tests for the tag: '${tag.id}'`, Kinds.Completion.Tag);
    receiver.Add("!" + tag.id, `Tests not for the tag: '${tag.id}'`, Kinds.Completion.Tag);
  });
}
