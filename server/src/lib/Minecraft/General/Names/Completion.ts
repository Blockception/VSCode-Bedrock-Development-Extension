import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Kinds } from "../Kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const data = context.doc.getConfiguration();
  const receiver = context.receiver;

  //From definitions
  const generateDoc = (item: string) => "The defined name: " + item;

  receiver.GenerateStr(data.definitions.name?.defined, generateDoc, Kinds.Completion.Objectives);
}
