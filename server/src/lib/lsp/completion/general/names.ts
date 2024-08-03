import { SimpleContext } from "../../../util/simple-context";
import { CompletionBuilder } from "../builder/builder";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const data = context.doc.configuration();
  const builder = context.builder;

  //From definitions
  const generateDoc = (item: string) => "The defined name: " + item;

  builder.generate(data.definitions.name?.defined, generateDoc, Kinds.Completion.Objectives);
}
