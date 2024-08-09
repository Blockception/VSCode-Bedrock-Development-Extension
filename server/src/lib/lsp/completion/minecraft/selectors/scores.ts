import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { Offset } from "../../../../util";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';

import * as Objectives from "../../general/objectives";

export function provideCompletion(context: Context<CompletionContext>, selector: OffsetWord, pos: number): void {
  const charBefore = Offset.charAt(selector, pos - 1);

  if (charBefore === "{") {
    return Objectives.provideCompletion(context);
  }

  if (Offset.IsWithin(selector, pos) || charBefore === "=") {
    return provideRange(context);
  }

  return Objectives.provideCompletion(context);
}

function provideRange(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: CompletionItemKind.Value });

  builder.add({ label: "0", documentation: "test for the exact value of 0" });
  builder.add({
    label: "!0",
    documentation: "test for the exact value of everything but 0",
  });
  builder.add({
    label: "0..",
    documentation: "test for the everything equal to 0 or higher",
  });
  builder.add({
    label: "..0",
    documentation: "test for the everything equal to 0 or lower",
  });
  builder.add({
    label: "0..10",
    documentation: "test for the everything equal to 0 or 10 and everything in between",
  });
  builder.add({
    label: "!0..10",
    documentation: "test for the everything not equal to 0 or 10 and everything in between",
  });
}
