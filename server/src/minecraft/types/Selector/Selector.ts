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
import { RangedWord } from "../../../code/include";

export function IsSelector(value: string): boolean {
  if (value.startsWith("@")) return true;

  if (value.includes(" ")) {
    if (value.startsWith('"') && value.endsWith('"')) return true;

    return false;
  }

  return false;
}

export function InSelector(selector: RangedWord, pos: number): boolean {
  if (selector.startindex + 2 <= pos && pos < selector.endindex) return true;

  return false;
}

export function InScore(selector: RangedWord, pos: number): boolean {
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

export function GetCurrentAttribute(selector: RangedWord, pos: number): string {
  let StartIndex = pos - selector.startindex;

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
  return !text.startsWith('@');
}

export function IsEditingValue(selector: RangedWord, pos: number): boolean {
  let diff = pos - selector.startindex;

  if (diff > 0) {
    if (selector.text.charAt(diff - 1) === "=") {
      return true;
    }
  }

  return false;
}
