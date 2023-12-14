import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from "../../../../Completion/Context";

import * as Entities from "../../../BehaviorPack/Entities/Completion";
import * as Family from "../../../BehaviorPack/Family/Completion";
import * as Modes from "../../../Modes";

import * as Integer from "../../../General/Integer";
import * as Names from "../../../General/Names";
import * as Float from "../../../General/Float";
import * as Tag from "../../../General/Tag";
import { OffsetWord } from 'bc-vscode-words';
import { equal } from 'assert';
import { Offset } from '../../../../Code';

//Doesnt do scores and doesnt need to
export function provideCompletion(context: CommandCompletionContext, attribute: string, forEntities: boolean): void {
  const receiver = context.receiver;

  switch (attribute) {
    case "c":
      receiver.Add("1", "Limits the amount of target to 1", CompletionItemKind.Constant);
      receiver.Add("-1", "Limits the amount of target to 1, but picked from the end of the list", CompletionItemKind.Constant);
      receiver.Add("5", "Limits the amount of target to 5", CompletionItemKind.Constant);
      receiver.Add("-5", "Limits the amount of target to 5, but picked from the end of the list", CompletionItemKind.Constant);
      return;

    case "dx":
    case "dy":
    case "dz":
      receiver.Add("5", "A length of 5", CompletionItemKind.Constant);
      receiver.Add("-5", "A length of 5, in the other direction", CompletionItemKind.Constant);
      return;

    case "family":
      Family.provideCompletionTest(context);
      return;

    case "r":
    case "rm":
    case "lm":
    case "l":
      Integer.provideCreateCompletion(receiver, 0, 100);
      return;

    case "m":
      Modes.Gamemode.provideCompletionTest(context);
      return;

    case "name":
      Names.provideCompletion(context);
      return;

    case "rx":
    case "rxm":
    case "ry":
    case "rym":
      Float.provideCreateCompletion(receiver, -180, 180);
      return;

    case "tag":
      Tag.provideCompletionTest(context);
      return;

    case "type":
      if (forEntities) {
        Entities.provideCompletion(context);
      }
      return;

    case "x":
    case "y":
    case "z":
      receiver.Add("1", "An absolute coordinate", CompletionItemKind.Constant);
      receiver.Add("~1", "A relative coordinate", CompletionItemKind.Constant);
      receiver.Add("~-1", "A relative coordinate", CompletionItemKind.Constant);
      return;

    case "hasitem":
      receiver.Add("[{},{}]", "Double Definition", CompletionItemKind.Class);
    case "scores":
      receiver.Add("{}", "Definition", CompletionItemKind.Class);
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
    if (text.charAt(equals + 1) === '{') return false;
    if (text.lastIndexOf(",") > equals) return false;

    return true;
  }

  return false;
}