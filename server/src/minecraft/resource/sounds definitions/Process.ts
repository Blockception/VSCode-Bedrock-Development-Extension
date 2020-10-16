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
import { Location, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { GetFilepath } from "../../../code/Url";
import { Database } from "../../../database/Database";
import { JsonDocument } from "../../../json/Json Document";
import { Sound } from "../../types/include";

/**
 * Processes the text document as a behaviour entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.GetObject();

  if (Format == undefined) return;

  let sound_def = Format["sound_definitions"];
  let Data = Database.Get(doc.uri);
  let uri = GetFilepath(doc.uri);
  Data.Sounds = [];

  if (sound_def) {
    let names = Object.getOwnPropertyNames(sound_def);

    names.forEach((name) => {
      let position = JDoc.GetRangeOfObject(name);

      if (position == undefined) {
        position = {
          start: { character: 0, line: 0 },
          end: { character: 1, line: 0 },
        };
      }

      let s = new Sound();
      s.Name = name;
      s.Location = Location.create(uri, position);
      Data.Sounds.push(s);
    });
  } else {
    let names = Object.getOwnPropertyNames(Format);

    names.forEach((name) => {
      if (name !== "format_version" && name !== "sound_definitions") {
        let position = JDoc.GetRangeOfObject(name);

        if (position == undefined) {
          position = {
            start: { character: 0, line: 0 },
            end: { character: 1, line: 0 },
          };
        }

        let s = new Sound();
        s.Name = name;
        s.Location = Location.create(uri, position);
        Data.Sounds.push(s);
      }
    });
  }
}
