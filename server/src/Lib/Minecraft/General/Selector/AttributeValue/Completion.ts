import { CompletionItemKind } from "vscode-languageserver";
import { CommandCompletionContext } from '../../../../Completion/Context';
import { BehaviorPack, General, Modes } from "../../../include";

//Doesnt do scores and doesnt need to
export function ProvideCompletion(context: CommandCompletionContext, attribute: string, forEntities: boolean): void {
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
      BehaviorPack.Family.ProvideCompletionTest(context);
      return;

    case "r":
    case "rm":
    case "lm":
    case "l":
      General.Integer.ProvideCreateCompletion(receiver, 0, 100);
      return;

    case "m":
      Modes.Gamemode.ProvideCompletionTest(context);
      return;

    case "name":
      General.Names.ProvideCompletion(context);
      return;

    case "rx":
    case "rxm":
    case "ry":
    case "rym":
      General.Float.ProvideCreateCompletion(receiver, -180, 180);
      return;

    case "tag":
      General.Tag.ProvideCompletionTest(context);
      return;

    case "type":
      if (forEntities) {
        BehaviorPack.Entities.ProvideCompletion(context);
      }
      return;

    case "x":
    case "y":
    case "z":
      receiver.Add("1", "An absolute coordinate", CompletionItemKind.Constant);
      receiver.Add("~1", "A relative coordinate", CompletionItemKind.Constant);
      receiver.Add("~-1", "A relative coordinate", CompletionItemKind.Constant);
      return;
  }
}
