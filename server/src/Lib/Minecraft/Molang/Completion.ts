import { PackType } from "bc-minecraft-bedrock-project";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionItemKind } from "vscode";
import { SimpleContext } from "../../Code/SimpleContext";
import { CompletionBuilder } from "../../Completion/Builder";
import { OnCompletionMolangVariable } from "../../Completion/Molang/Variables";
import { Languages } from "../../Constants";
import { Database } from "../../include";
import { GetPreviousWord, IsMolang } from "../../Molang/include";
import { IsEducationEnabled } from "../../Project/include";
import { TextDocument } from "../../Types/Document/include";
import { BehaviorPack, ResourcePack } from "../include";

/**
 *
 * @param line
 * @param cursor
 * @param doc
 * @param receiver
 * @returns
 */
export function OnCompletionMolang(line: string, cursor: number, context: SimpleContext<CompletionBuilder>): void {
  const Word = GetPreviousWord(line, cursor).toLowerCase();
  const Edu = IsEducationEnabled(context.doc);

  switch (Word) {
    case "animation":
      return PrefixedData(ResourcePack.Animations.ProvideCompletion, BehaviorPack.Animations.ProvideCompletion, context);

    case "controller":
      return PrefixedData(
        (context) => {
          ResourcePack.AnimationControllers.ProvideCompletion(context);
          ResourcePack.RenderControllers.ProvideCompletion(context);
        },
        BehaviorPack.AnimationControllers.ProvideCompletion,
        context
      );

    case "q":
    case "query":
      //TODO redo

      //Convert(Manager.Data.Vanilla.Molang.Query, receiver);
      //if (Edu) Convert(Manager.Data.Edu.Molang.Query, receiver);
      return;

    case "m":
    case "math":
      //TODO redo

      //Convert(Manager.Data.Vanilla.Molang.Math, receiver);
      //if (Edu) Convert(Manager.Data.Edu.Molang.Math, receiver);
      return;

    case "geometry":
      return ResourcePack.Models.ProvideCompletion(context);

    case "v":
    case "variable":
      return OnCompletionMolangVariable(doc, receiver);

    case "t":
    case "texture":
    case "temp":
      break;
  }

  const doc = context.doc;
  const receiver = context.receiver;

  if (IsMolang(line) || doc.languageId == Languages.McMolangIdentifier) {
    receiver.Add("query", "", CompletionItemKind.Class);
    receiver.Add("variable", "", CompletionItemKind.Variable);
    receiver.Add("math", "", CompletionItemKind.Class);
    receiver.Add("texture", "", CompletionItemKind.Property);
    receiver.Add("geometry", "", CompletionItemKind.Property);
    receiver.Add("temp", "", CompletionItemKind.Variable);
    receiver.Add("this", "", CompletionItemKind.Struct);

    //TODO redo
    //ConvertPrefixed(Manager.Data.Vanilla.Molang.Query, receiver, "query.");
    //ConvertPrefixed(Manager.Data.Vanilla.Molang.Math, receiver, "math.");

    if (Edu) {
      //TODO redo
      //ConvertPrefixed(Manager.Data.Edu.Molang.Query, receiver, "query.");
      //ConvertPrefixed(Manager.Data.Edu.Molang.Math, receiver, "math.");
    }
  }
}

type functioncall = (context: SimpleContext<CompletionBuilder>) => void;

function PrefixedData(RP: functioncall, BP: functioncall, context: SimpleContext<CompletionBuilder>): void {
  const type = PackType.detect(context.doc.uri);

  const old_OnNewItem = context.receiver.OnNewItem;

  //register new OnNewItem event to prune ids
  context.receiver.OnNewItem = (item) => {
    item.label = IDRemoveFirst(item.label);

    if (old_OnNewItem) old_OnNewItem(item);
  };

  switch (type) {
    case PackType.behavior_pack:
      BP(context);
      break;

    case PackType.resource_pack:
      RP(context);
      break;
  }

  //Restore old OnNewItem
  context.receiver.OnNewItem = old_OnNewItem;
}

function IDRemoveFirst(id: string): string {
  const index = id.indexOf(".");

  if (index > -1) return id.substring(index + 1);

  return id;
}
