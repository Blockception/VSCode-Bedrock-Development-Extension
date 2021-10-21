import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Context";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { FakeEntity } from "../include";
import { InternalSelectorTypeMode } from "bc-minecraft-bedrock-types/lib/src/Modes/SelectorType";

import * as AttributeValue from "./AttributeValue/include";
import * as Attributes from "./Attributes/include";
import * as Scores from "./Scores/include";

/**
 *
 * @param context
 * @returns
 */
export function ProvideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const selector = context.current;
  const pos = context.cursor;
  const Options = context.parameter.options;
  const edu = IsEducationEnabled(context.doc);

  const playerOnly = Options?.playerOnly ?? false;

  if (Options?.wildcard) receiver.Add("*", "Wildcard, aimed at all players / entities, or possible stored in memory", CompletionItemKind.Constant);

  if (selector === undefined || selector.text === "" || !InSelector(selector, pos)) {
    //In selector
    if (selector !== undefined) {
      let diff = pos - selector.offset;

      if (diff < 3) {
        receiver.items.push({ label: "[", kind: CompletionItemKind.Snippet });
        return;
      }
    }

    //Defaults
    FromType(receiver, InternalSelectorTypeMode.AllPlayers);
    FromType(receiver, InternalSelectorTypeMode.Nearest);
    FromType(receiver, InternalSelectorTypeMode.Random);
    FromType(receiver, InternalSelectorTypeMode.Self);

    if (!playerOnly) {
      FromType(receiver, InternalSelectorTypeMode.AllEntities);
    }

    if (context.doc.uri.includes("/dialogue/")) FromType(receiver, InternalSelectorTypeMode.Initiator);

    if (edu) {
      FromType(receiver, InternalSelectorTypeMode.Agents);
      FromType(receiver, InternalSelectorTypeMode.AllAgents);
    }

    if (Options?.allowFakePlayers) FakeEntity.ProvideCompletion(context);

    return;
  }

  //Not in selector
  if (InScore(selector, pos)) {
    Scores.ProvideCompletion(context, selector, pos);
    return;
  }

  if (IsEditingValue(selector, pos)) {
    const Attribute = GetCurrentAttribute(selector, pos);
    AttributeValue.ProvideCompletion(context, Attribute, !playerOnly);
  } else {
    Attributes.ProvideCompletion(context, !playerOnly);
  }
}

/**
 *
 * @param receiver
 * @param item
 */
function FromType(receiver: CompletionBuilder, item: any): void {
  receiver.Add(item.name, item.documentation, CompletionItemKind.TypeParameter);
}

/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export function InSelector(selector: OffsetWord, pos: number): boolean {
  if (pos < selector.offset + 2) return false;
  if (pos > selector.offset + selector.text.length) return false;

  return true;
}

/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export function InScore(selector: OffsetWord, pos: number): boolean {
  let Index = selector.text.indexOf("scores");

  if (Index < 0) return false;

  //scores={}
  if (pos < Index + 8) {
    return false;
  }

  Index = selector.text.indexOf("}") + selector.offset;

  if (Index < 0) return true;

  return pos <= Index;
}

/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export function GetCurrentAttribute(selector: OffsetWord, pos: number): string {
  let StartIndex = pos - selector.offset;

  while (StartIndex > 2) {
    let C = selector.text.charAt(StartIndex);

    if (C === ",") {
      break;
    }

    StartIndex--;
  }

  StartIndex++;
  let EndIndex = selector.text.indexOf("=", StartIndex);

  if (EndIndex < 0) EndIndex = selector.text.length;

  return selector.text.slice(StartIndex, EndIndex).trim();
}

/**
 *
 * @param text
 * @returns
 */
export function IsFakePlayer(text: string): boolean {
  return !text.startsWith("@") && text !== "*";
}

/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export function IsEditingValue(selector: OffsetWord, pos: number): boolean {
  const diff = pos - selector.offset;

  if (diff > 0) {
    if (selector.text.charAt(diff - 1) === "=") {
      return true;
    }
  }

  return false;
}
