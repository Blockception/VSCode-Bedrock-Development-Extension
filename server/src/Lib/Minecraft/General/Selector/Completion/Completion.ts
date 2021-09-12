import { CompletionItemKind } from "vscode-languageserver";
import { provideSelectorAttributeValueCompletion } from "./Attribute Value";
import { provideSelectorAttributeCompletion } from "./Attributes";
import { provideSelectorScoreCompletion } from "./Scores";
import { FakeEntity } from "../../include";
import { CommandCompletionContext } from "../../../../Completion/Commands/context";

export function ProvideCompletion(context: CommandCompletionContext): void {
  /**
  const receiver = context.receiver;
  const selector = context.current;
  const pos = context.cursor;
  const Options = context.parameter.options;

  const playerOnly = Options?.playerOnly ?? false;
  const wildcard = Options?.wildcard ?? false;
  const fakePlayer = Options?.allowFakePlayers ?? false;

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
    receiver.items.push(
      SelectorBase.Completion.AllPlayer,
      SelectorBase.Completion.Executing,
      SelectorBase.Completion.Executing,
      SelectorBase.Completion.Random,
      SelectorBase.Completion.NearestPlayer
    );

    const set = context.doc.getConfiguration().settings;

    if (!set.Diagnostics.Enable) return;
    if (set.Education.Enable) {
      receiver.items.push(SelectorBase.Completion.MyAgent, SelectorBase.Completion.SomethingEdu, SelectorBase.Completion.Initiator);
    } else if (context.doc.uri.includes("/dialogue/")) {
      receiver.items.push(SelectorBase.Completion.Initiator);
    }

    if (!playerOnly) {
      receiver.items.push(SelectorBase.Completion.AllEntities);
    }
    if (fakePlayer) {
      FakeEntity.ProvideCompletion(context);
    }

    return;
  }

  //Not in selector
  if (InScore(selector, pos)) {
    provideSelectorScoreCompletion(receiver, selector, pos);
    return;
  }

  if (IsEditingValue(selector, pos)) {
    let Attribute = GetCurrentAttribute(selector, pos);
    provideSelectorAttributeValueCompletion(receiver, Attribute, !playerOnly);
  } else {
    provideSelectorAttributeCompletion(receiver, !playerOnly);
  }
  */
}
