import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../../Completion/Builder";
import { Gamemode } from "../../../../Minecraft/Modes/include";
import { Entity, Family, Float, Integer, Names, Tag } from "../../include";

//Doesnt do scores and doesnt need to
export function provideSelectorAttributeValueCompletion(receiver: CompletionBuilder, attribute: string, forEntities: boolean, type: string | undefined = undefined): void {
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
      Family.ProvideCompletionTest(receiver, type);
      return;

    case "r":
    case "rm":
    case "lm":
    case "l":
      Integer.ProvideCreateCompletion(receiver, 0, 100);
      return;

    case "m":
      Gamemode.ProvideCompletionTest(receiver);
      return;

    case "name":
      Names.ProvideCompletion(receiver);
      return;

    case "rx":
    case "rxm":
    case "ry":
    case "rym":
      Float.ProvideCreateCompletion(receiver, -180, 180);
      return;

    case "tag":
      Tag.ProvideCompletionTest(receiver);
      return;

    case "type":
      if (forEntities) {
        Entity.ProvideCompletionTest(receiver);
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
