import { CompletionItemKind } from "vscode-languageserver";
import { GetCurrentAttribute, InScore, InSelector, IsEditingValue } from "../Functions";
import { provideSelectorAttributeValueCompletion } from "./Attribute Value";
import { provideSelectorAttributeCompletion } from "./Attributes";
import { provideSelectorScoreCompletion } from "./Scores";
import { SelectorBase } from "./BaseMode";
import { FakeEntity } from "../../include";
import { CommandCompletionContext } from "../../../../Completion/Commands/Context";
import { Manager } from "../../../../Manager/include";

export function ProvideCompletion(Context: CommandCompletionContext): void {
  let receiver = Context.receiver;
  let selector = Context.Current;
  let pos = Context.Pos.character;
  let Options = Context.Parameter.Options;

  const playerOnly = Options?.playerOnly ?? false;
  const wildcard = Options?.wildcard ?? false;
  const fakePlayer = Options?.allowFakePlayers ?? false;

  if (selector === undefined || selector.text === "" || !InSelector(selector, pos)) {
    //In selector
    if (selector !== undefined) {
      let diff = pos - selector.location.range.start.character;

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

    let set = Context.doc.getConfiguration().settings;

    if (!set.Diagnostics.Enable) return;
    if (set.Education.Enable) {
      receiver.items.push(SelectorBase.Completion.MyAgent, SelectorBase.Completion.SomethingEdu);
    }

    if (!playerOnly) {
      receiver.items.push(SelectorBase.Completion.AllEntities);
    }
    if (fakePlayer) {
      FakeEntity.ProvideCompletion(Context);
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
}
