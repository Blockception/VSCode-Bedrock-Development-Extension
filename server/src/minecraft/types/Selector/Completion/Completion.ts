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
import { CompletionItem, CompletionItemKind, CompletionList } from "vscode-languageserver";
import { LocationWord } from "../../../../code/include";
import { MCCommandParameter } from "../../../commands/include";
import { provideFakePlayersCompletion } from "../../FakeEntity/Completion";
import { Kinds } from "../../Kinds";
import { GetCurrentAttribute, InScore, InSelector, IsEditingValue } from "../Selector";
import { provideSelectorAttributeCompletion, provideSelectorAttributeValueCompletion } from "./Attributes";
import { provideSelectorScoreCompletion } from "./Scores";

const AllPlayer: CompletionItem = { label: "@a", kind: Kinds.Completion.Selector, documentation: "Targets all players" };
const AllEntities: CompletionItem = { label: "@e", kind: Kinds.Completion.Selector, documentation: "Targets all entities" };
const Executing: CompletionItem = { label: "@s", kind: Kinds.Completion.Selector, documentation: "Targets the executing entity" };
const Random: CompletionItem = {
  label: "@r",
  kind: Kinds.Completion.Selector,
  documentation: "Targets random players, or if specified, random types",
};
const NearestPlayer: CompletionItem = { label: "@p", kind: Kinds.Completion.Selector, documentation: "Targets the nearest player" };

export function provideSelectorCompletion(
  receiver: CompletionList,
  selector: LocationWord | undefined,
  pos: number,
  parameter: MCCommandParameter
): void {
  const playerOnly = parameter.Options?.playerOnly ?? false;
  const wildcard = parameter.Options?.wildcard ?? false;
  const fakePlayer = parameter.Options?.allowFakePlayers ?? false;

  if (selector === undefined || selector.text === "" || !InSelector(selector, pos)) {
    //In selector
    if (selector !== undefined) {
      let diff = pos - selector.range.start.character;

      if (diff < 3) {
        receiver.items.push({ label: "[", kind: CompletionItemKind.Snippet });
        return;
      }
    }

    //Defaults
    receiver.items.push(AllPlayer, Executing, Executing, Random, NearestPlayer);

    if (!playerOnly) {
      receiver.items.push(AllEntities);
    }
    if (fakePlayer) {
      provideFakePlayersCompletion(receiver);
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
