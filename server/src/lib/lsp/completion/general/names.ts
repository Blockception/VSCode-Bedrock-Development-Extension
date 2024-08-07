
import { CompletionContext } from "../context";
import { Context } from "../../context/context";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: Context<CompletionContext>): void {
  const data = context.document.configuration();
  const builder = context.builder;

  //From definitions
  const generateDoc = (item: string) => "The defined name: " + item;

  builder.generate(data.definitions.name?.defined, generateDoc, Kinds.Completion.Objectives);
}
