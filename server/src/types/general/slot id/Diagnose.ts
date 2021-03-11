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
import { LocationWord } from "bc-vscode-words";
import { CommandIntr } from "../../commands/interpertation/include";
import { GetMode } from "../../commands/modes/Functions";
import { SlotTypeMode, SlotTypeModes } from "../Slot type/Slot type";
import { DiagnosticsBuilder } from "../../../diagnostics/Builder";
import { Integer } from '../include';

export function ProvideDiagnose(word: LocationWord, Command: CommandIntr, builder: DiagnosticsBuilder): void {
  let Index = Command.Parameters.indexOf(word);

  if (Index < 0) return;

  Integer.ProvideDiagnose(word, builder);

  const SlotType = Command.Parameters[Index - 1].text;
  const SlotID = Number.parseInt(word.text);

  let Mode = GetMode(SlotTypeModes, SlotType);

  if (SlotTypeMode.is(Mode)) {
    if (Mode.range) {
      ErrorCheck(builder, word, SlotType, SlotID, Mode.range.min, Mode.range.max);
    }
  }
}

function ErrorCheck(builder: DiagnosticsBuilder, word: LocationWord, slotType: string, value: number, min: number, max: number): void {
  if (value < min && value > max) {
    builder.AddWord(word, `Slot id '${value}' for '${slotType}' needs to be between, including: ${min} and ${max}`);
  }
}
