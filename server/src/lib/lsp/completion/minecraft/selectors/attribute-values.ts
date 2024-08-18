import { Modes } from "bc-minecraft-bedrock-types";
import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { Offset } from "../../../../util";
import { Context } from "../../../context/context";
import { CommandCompletionContext } from "../../context";
import { Float, Integer, Names, Tags } from "../../general";

import * as Entities from "../behavior-pack/entity/main";
import * as Family from "../behavior-pack/families";
import * as M from "../modes/modes";

export function provideCompletion(
  context: Context<CommandCompletionContext>,
  attribute: string,
  forEntities: boolean
): void {
  const builder = context.builder;

  switch (attribute) {
    case "c":
      builder.add({
        label: "1",
        documentation: "Limits the amount of target to 1",
        kind: CompletionItemKind.Constant,
      });
      builder.add({
        label: "-1",
        documentation: "Limits the amount of target to 1, but picked from the end of the list",
        kind: CompletionItemKind.Constant,
      });
      builder.add({
        label: "5",
        documentation: "Limits the amount of target to 5",
        kind: CompletionItemKind.Constant,
      });
      builder.add({
        label: "-5",
        documentation: "Limits the amount of target to 5, but picked from the end of the list",
        kind: CompletionItemKind.Constant,
      });
      return;

    case "dx":
    case "dy":
    case "dz":
      builder.add({ label: "5", documentation: "A length of 5", kind: CompletionItemKind.Constant });
      builder.add({
        label: "-5",
        documentation: "A length of 5, in the other direction",
        kind: CompletionItemKind.Constant,
      });
      return;

    case "family":
      Family.provideCompletionTest(context);
      return;

    case "r":
    case "rm":
    case "lm":
    case "l":
      Integer.provideCreateCompletion(builder, 0, 100);
      return;

    case "m":
      M.provideModeCompletionTest(Modes.Gamemode, context);
      return;

    case "name":
      Names.provideCompletion(context);
      return;

    case "rx":
    case "rxm":
    case "ry":
    case "rym":
      Float.provideCreateCompletion(builder, -180, 180);
      return;

    case "tag":
      Tags.provideCompletionTest(context);
      return;

    case "type":
      if (forEntities) {
        Entities.provideCompletion(context);
      }
      return;

    case "x":
    case "y":
    case "z":
      builder.add({ label: "1", documentation: "An absolute coordinate", kind: CompletionItemKind.Constant });
      builder.add({ label: "~1", documentation: "A relative coordinate", kind: CompletionItemKind.Constant });
      builder.add({ label: "~-1", documentation: "A relative coordinate", kind: CompletionItemKind.Constant });
      return;

    case "hasitem":
      builder.add({ label: "[{},{}]", documentation: "Double Definition", kind: CompletionItemKind.Class });
      // falls through
    case "has_property":
    case "scores":
      builder.add({ label: "{}", documentation: "Definition", kind: CompletionItemKind.Class });
      return;
  }
}

/**
 *
 * @param value
 * @param pos
 * @returns
 */
export function IsEditingValue(value: OffsetWord, pos: number): boolean {
  const charBefore = Offset.charAt(value, pos - 1);
  if (charBefore === "{") return false;
  if (charBefore === ",") return false;
  if (charBefore === "=") return true;

  pos = pos - value.offset;

  if (pos < 0) return false;
  const text = value.text.slice(0, pos);

  const equals = text.lastIndexOf("=");
  if (equals > -1 && pos > equals) {
    //Block by the equals
    if (text.charAt(equals + 1) === "{") return false;
    if (text.lastIndexOf(",") > equals) return false;

    return true;
  }

  return false;
}
