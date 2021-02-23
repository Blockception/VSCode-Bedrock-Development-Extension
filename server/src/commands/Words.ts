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
import { IBaseWordBuilder } from "bc-vscode-words";

export function CreateMinecraftCommandWords(text: string, Builder: IBaseWordBuilder): void {
  let level = 0;
  let startindex = 0;
  let Instring = false;

  for (let index = 0; index < text.length; index++) {
    let c = text.charAt(index);

    //If instring or not
    if (Instring) {
      //Is end of string and not escaped?
      if (c == '"' && text.charAt(index - 1) !== "\\") Instring = false;
    } else {
      //Switch on character
      switch (c) {
        //Its a string start
        case '"':
          Instring = true;
          break;

        //Bracket start
        case "[":
        case "(":
        case "{":
          level++;
          break;

        //Bracket end
        case "]":
        case ")":
        case "}":
          level--;
          break;

        //Empty spaces
        case " ":
        case "\t":
          if (level == 0) {
            if (startindex < index) {
              const word = text.substring(startindex, index).trim();
              Builder.Add(word, startindex);
            }

            startindex = index + 1;
          }
          break;

        //Coordinates start
        case "~":
        case "^":
          if (level == 0) {
            if (startindex < index) {
              const word = text.substring(startindex, index).trim();
              Builder.Add(word, startindex);
            }

            startindex = index;
          }

          break;
        default:
          break;
      }
    }

    if (level < 0) break;
  }

  if (startindex < text.length) {
    const word = text.substring(startindex, text.length).trim();
    Builder.Add(word, startindex);
  }
}
