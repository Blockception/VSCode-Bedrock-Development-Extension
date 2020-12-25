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
import { LocationWord } from "../../../code/words/include";
import { ParameterOptions } from "../../commands/Parameter/include";

export function IsSelector(value: string, Options: ParameterOptions | undefined): boolean {
  if (value.startsWith("@")) return true;

  if (Options) {
    if (Options.wildcard === true) {
      if (value === "*") return true;
    }

    if (Options.allowFakePlayers === true) {
      if (value.startsWith('"') && value.endsWith('"')) return true;

      if (value.includes(" ")) {
        return false;
      }
      return true;
    }
  }

  return false;
}

export function InSelector(selector: LocationWord, pos: number): boolean {
  if (selector.range.start.character + 2 <= pos && pos < selector.range.end.character) return true;

  return false;
}

export function InScore(selector: LocationWord, pos: number): boolean {
  let Index = selector.text.indexOf("scores");

  if (Index < 0) return false;

  //scores={}
  if (pos < Index + 8) {
    return false;
  }

  Index = selector.text.indexOf("}");

  if (Index < 0) return true;

  return pos < Index;
}

export function GetCurrentAttribute(selector: LocationWord, pos: number): string {
  let StartIndex = pos - selector.range.start.character;

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

  return selector.text.slice(StartIndex, EndIndex);
}

export function IsFakePlayer(text: string): boolean {
  return !text.startsWith("@") && text !== "*";
}

export function IsEditingValue(selector: LocationWord, pos: number): boolean {
  let diff = pos - selector.range.start.character;

  if (diff > 0) {
    if (selector.text.charAt(diff - 1) === "=") {
      return true;
    }
  }

  return false;
}
