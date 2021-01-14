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
import { Location, Position } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../code/json/include";
import { Database } from "../../../../database/include";
import { DataReference } from "../../../../database/Types/include";
import { molang } from "../../../../include";
import { EmptyTypes } from "../../../general/Empty";
import { Animation, SingleAnimation } from "./Animation";

/**
 * Processes the text document as a behaviour entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<Animation>();

  if (!Animation.is(Format)) return;

  let Names = Object.getOwnPropertyNames(Format.animations);
  for (let Index = 0; Index < Names.length; Index++) {
    const Name = Names[Index];
    let Range = JDoc.GetRangeOfObject(Name);
    let Location: Location = {
      uri: doc.uri,
      range: Range ?? EmptyTypes.EmptyRange(),
    };

    Database.Data.Behaviourpack.Animations.Set(new DataReference(Name, Location));
    let Animation = Format.animations[Name];

    /*if (Animation) {
      ExploreAnimation(Animation, JDoc);
    }*/
  }
}

function ExploreAnimation(Animation: SingleAnimation, doc: JsonDocument) {
  let timelines = Animation.timeline;
  if (timelines) {
    let Names = Object.getOwnPropertyNames(timelines);

    for (let I = 0; I < Names.length; I++) {
      let Name = Names[I];

      let timeline = timelines[Name];
      if (timeline && timeline.length) {
        for (let I = 0; I < timeline.length; I++) {
          let data = timeline[I];
          let start = doc.GetStartOfObject(data);

          if (!start) {
            start = Position.create(0, 0);
          }

          molang.Process(data, start, doc.doc);
        }
      }
    }
  }
}
