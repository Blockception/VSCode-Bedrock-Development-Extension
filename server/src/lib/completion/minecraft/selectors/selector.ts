import { OffsetWord } from "bc-vscode-words";
import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../builder/builder";
import { CommandCompletionContext } from "../../builder/context";
import { IsEducationEnabled } from "../../../project/Attributes";
import { InternalSelectorTypeMode } from "bc-minecraft-bedrock-types/lib/src/modes/selector-type";

import * as Attributes from "./attributes";
import * as AttributeValue from "./attribute-values";
import * as FakeEntity from "../../general/fake-entity";
import * as HasItem from "./has-item";
import * as HasProperty from "./has-property";
import * as Scores from "./scores";

/**
 *
 * @param context
 * @returns
 */
export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const selector = context.current;
  const pos = context.cursor;
  const Options = context.parameter.options;
  const edu = IsEducationEnabled(context.doc);

  const playerOnly = Options?.playerOnly ?? false;

  if (Options?.wildcard)
    receiver.add({
      label: "*",
      documentation: "Wildcard, aimed at all players / entities, or possible stored in memory",
      kind: CompletionItemKind.Constant,
    });

  if (selector === undefined || selector.text === "" || !InSelector(selector, pos)) {
    //In selector
    if (selector !== undefined) {
      let diff = pos - selector.offset;

      if (diff < 3) {
        receiver.add({ label: "[", kind: CompletionItemKind.Snippet });
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

    if (Options?.allowFakePlayers) FakeEntity.provideCompletion(context);

    return;
  }

  //Not in selector
  if (InScore(selector, pos)) {
    return Scores.provideCompletion(context, selector, pos);
  }

  //Not in selector
  if (InHasItem(selector, pos)) {
    return HasItem.provideCompletion(context, selector, pos);
  }
  if (InHasProperty(selector, pos)) {
    return HasProperty.provideCompletion(context, selector, pos);
  }

  if (AttributeValue.IsEditingValue(selector, pos)) {
    const Attribute = Attributes.GetCurrentAttribute(selector, pos);
    AttributeValue.provideCompletion(context, Attribute, !playerOnly);
  } else {
    Attributes.provideCompletion(context, !playerOnly);
  }
}

/**
 *
 * @param receiver
 * @param item
 */
function FromType(receiver: CompletionBuilder, item: any): void {
  receiver.add({ label: item.name, documentation: item.documentation, kind: CompletionItemKind.TypeParameter });
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
  pos -= selector.offset;
  let index = selector.text.indexOf("scores");
  if (index < 0) return false;

  //scores={}
  if (pos < index + 8) {
    return false;
  }

  index = selector.text.indexOf("}", index);
  if (pos <= index) return true;

  return pos <= index;
}

/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export function InHasProperty(selector: OffsetWord, pos: number): boolean {
  pos -= selector.offset;
  let index = selector.text.indexOf("has_property");
  if (index < 0) return false;

  //scores={}
  if (pos < index + 8) {
    return false;
  }

  index = selector.text.indexOf("}", index);
  if (pos <= index) return true;

  return pos <= index;
}

/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export function InHasItem(selector: OffsetWord, pos: number): boolean {
  pos -= selector.offset;
  let index = selector.text.indexOf("hasitem");
  if (index < 0) return false;

  //hasitem=[{}]
  if (pos < index + 10) {
    return false;
  }

  if (selector.text[index + 8] === "[") {
    index = selector.text.indexOf("]", index);
    if (pos <= index) return true;

    return pos <= index;
  }

  index = selector.text.indexOf("}", index);
  if (pos <= index) return true;

  return pos <= index;
}

/**
 *
 * @param text
 * @returns
 */
export function IsFakePlayer(text: string): boolean {
  return !text.startsWith("@") && text !== "*";
}
