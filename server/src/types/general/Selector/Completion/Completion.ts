/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { CompletionItemKind } from "vscode-languageserver";
import { GetCurrentAttribute, InScore, InSelector, IsEditingValue } from "../Functions";
import { provideSelectorAttributeValueCompletion } from "./Attribute Value";
import { provideSelectorAttributeCompletion } from "./Attributes";
import { provideSelectorScoreCompletion } from "./Scores";
import { SelectorBase } from "./BaseMode";
import { FakeEntity } from "../../include";
import { CommandCompletionContext } from '../../../../completion/Commands/Context';

export function ProvideCompletion(Context : CommandCompletionContext) : void {
  let receiver = Context.receiver;
  let selector = Context.Current
  let pos = Context.pos;
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
