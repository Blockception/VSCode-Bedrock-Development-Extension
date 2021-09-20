import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const data = context.doc.getConfiguration();
  const receiver = context.receiver;

  const names = data.definitions.name?.defined;

  if (names) {
    const generateDoc = (item: string) => "The defined name: " + item;

    receiver.GenerateStr(names, generateDoc, Kinds.Completion.Entity);
  }
}
