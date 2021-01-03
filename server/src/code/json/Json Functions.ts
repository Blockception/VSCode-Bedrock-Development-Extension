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
export interface TextRange {
  start: number;
  end: number;
}

export function GetCurrentElement(Text: string, cursor: number): TextRange | undefined {
  let StartIndex = -1;
  let Instring = false;

  for (let Index = cursor; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      Instring = true;
      StartIndex = Index + 1;
      break;
    } else if (c === "," || c === ":") {
      StartIndex = Index + 1;
      break;
    }
  }

  if (StartIndex < 0) {
    return undefined;
  }

  let EndIndex = -1;

  for (let Index = StartIndex; Index < Text.length; Index++) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      EndIndex = Index;
      break;
    } else if (Instring == false && (c === "," || c === ":")) {
      EndIndex = Index;
      break;
    }
  }

  if (EndIndex < 0) {
    return undefined;
  }

  return { start: StartIndex, end: EndIndex };
}


export function GetCurrentString(Text: string, cursor: number): TextRange | undefined {
  let StartIndex = -1;

  for (let Index = cursor - 1; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      StartIndex = Index + 1;
      break;
    }
  }

  if (StartIndex < 0) {
    return undefined;
  }

  let EndIndex = -1;

  for (let Index = StartIndex; Index < Text.length; Index++) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      EndIndex = Index;
      break;
    }
  }

  if (EndIndex < 0) {
    return undefined;
  }

  return { start: StartIndex, end: EndIndex };
}

export function GetStartString(Text: string, cursor: number): number {

  for (let Index = cursor; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === '"') {
      if (Text.charAt(Index - 1) === "\\") {
        continue;
      }

      return Index;
    }
  }

  return -1;
}

export function IsProperty(Text: string, startindex: number): boolean {

  for (let Index = startindex; Index > -1; Index--) {
    const c = Text.charAt(Index);

    if (c === ':') {
      return true;
    }
    else if (c.trim() === '')
      continue;
    else
      break;
  }

  return false;
}