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
import { CompletionList } from "vscode-languageserver";
import { Kinds } from "../Kinds";

export function provideGamemodeCompletion(receiver: CompletionBuilder): void {
  receiver.items.push(
    { label: "c", kind: Kinds.Completion.Gamemode, documentation: "The creative gamemode" },
    { label: "creative", kind: Kinds.Completion.Gamemode, documentation: "The creative gamemode" },
    { label: "1", kind: Kinds.Completion.Gamemode, documentation: "The creative gamemode" },
    { label: "a", kind: Kinds.Completion.Gamemode, documentation: "The adventure gamemode" },
    { label: "adventure", kind: Kinds.Completion.Gamemode, documentation: "The adventure gamemode" },
    { label: "2", kind: Kinds.Completion.Gamemode, documentation: "The adventure gamemode" },
    { label: "s", kind: Kinds.Completion.Gamemode, documentation: "The survival gamemode" },
    { label: "survival", kind: Kinds.Completion.Gamemode, documentation: "The survival gamemode" },
    { label: "0", kind: Kinds.Completion.Gamemode, documentation: "The survival gamemode" }
  );
}

export function provideGamemodeTestCompletion(receiver: CompletionBuilder): void {
  receiver.items.push(
    { label: "c", kind: Kinds.Completion.Gamemode, documentation: "Tests for the creative gamemode" },
    { label: "!c", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the creative gamemode" },
    { label: "creative", kind: Kinds.Completion.Gamemode, documentation: "Tests for the creative gamemode" },
    { label: "!creative", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the creative gamemode" },
    { label: "1", kind: Kinds.Completion.Gamemode, documentation: "Tests for the creative gamemode" },
    { label: "!1", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the creative gamemode" },
    { label: "a", kind: Kinds.Completion.Gamemode, documentation: "Tests for the adventure gamemode" },
    { label: "!a", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the adventure gamemode" },
    { label: "adventure", kind: Kinds.Completion.Gamemode, documentation: "Tests for the adventure gamemode" },
    { label: "!adventure", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the adventure gamemode" },
    { label: "2", kind: Kinds.Completion.Gamemode, documentation: "Tests for the adventure gamemode" },
    { label: "!2", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the adventure gamemode" },
    { label: "s", kind: Kinds.Completion.Gamemode, documentation: "Tests for the survival gamemode" },
    { label: "!s", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the survival gamemode" },
    { label: "survival", kind: Kinds.Completion.Gamemode, documentation: "Tests for the survival gamemode" },
    { label: "!survival", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the survival gamemode" },
    { label: "0", kind: Kinds.Completion.Gamemode, documentation: "Tests for the survival gamemode" },
    { label: "!0", kind: Kinds.Completion.Gamemode, documentation: "Tests not for the survival gamemode" }
  );
}
