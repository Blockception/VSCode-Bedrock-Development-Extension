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
import { CompletionBuilder } from "../../../completion/Builder";
import { Kinds } from "../Kinds";

export function provideGamemodeCompletion(receiver: CompletionBuilder): void {
  receiver.Add("c", "The creative gamemode", Kinds.Completion.Gamemode);
  receiver.Add("creative", "The creative gamemode", Kinds.Completion.Gamemode);
  receiver.Add("1", "The creative gamemode", Kinds.Completion.Gamemode);
  receiver.Add("a", "The adventure gamemode", Kinds.Completion.Gamemode);
  receiver.Add("adventure", "The adventure gamemode", Kinds.Completion.Gamemode);
  receiver.Add("2", "The adventure gamemode", Kinds.Completion.Gamemode);
  receiver.Add("s", "The survival gamemode", Kinds.Completion.Gamemode);
  receiver.Add("survival", "The survival gamemode", Kinds.Completion.Gamemode);
  receiver.Add("0", "The survival gamemode", Kinds.Completion.Gamemode);
}

export function provideGamemodeTestCompletion(receiver: CompletionBuilder): void {
  receiver.Add("c", "Tests for the creative gamemode");
  receiver.Add("!c", "Tests not for the creative gamemode");
  receiver.Add("creative", "Tests for the creative gamemode");
  receiver.Add("!creative", "Tests not for the creative gamemode");
  receiver.Add("1", "Tests for the creative gamemode");
  receiver.Add("!1", "Tests not for the creative gamemode");
  receiver.Add("a", "Tests for the adventure gamemode");
  receiver.Add("!a", "Tests not for the adventure gamemode");
  receiver.Add("adventure", "Tests for the adventure gamemode");
  receiver.Add("!adventure", "Tests not for the adventure gamemode");
  receiver.Add("2", "Tests for the adventure gamemode");
  receiver.Add("!2", "Tests not for the adventure gamemode");
  receiver.Add("s", "Tests for the survival gamemode");
  receiver.Add("!s", "Tests not for the survival gamemode");
  receiver.Add("survival", "Tests for the survival gamemode");
  receiver.Add("!survival", "Tests not for the survival gamemode");
  receiver.Add("0", "Tests for the survival gamemode");
  receiver.Add("!0", "Tests not for the survival gamemode");
}
