import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../builder/builder";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const data = context.doc.getConfiguration();
  const receiver = context.receiver;

  //From definitions
  const generateDoc = (item: string) => "The defined name: " + item;

  receiver.generate(data.definitions.name?.defined, generateDoc, Kinds.Completion.Objectives);
}
