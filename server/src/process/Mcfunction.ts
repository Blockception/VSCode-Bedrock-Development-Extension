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
import { Database } from '../Database';
import { MinecraftData } from '../minecraft/Minecraft Data';
import { Tag } from '../minecraft/types/Tag/Tag';
import { Objective } from '../minecraft/types/Objectives/Objectives';
import { Tickingarea } from '../minecraft/types/include';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { GetFilepath, getLine } from '../code/include';
import { Location, Range } from 'vscode-languageserver';

export function Process(document: TextDocument): MinecraftData {
   let uri = document.uri;
   let Data = new MinecraftData();

   for (let Index = 0; Index < document.lineCount; Index++) {
      const Line = getLine(document, Index);

      if (Line.startsWith("#"))
         continue;

      //Tags
      if (Line.includes('tag')) {
         ProcessTag(Line, Data, uri, Index);
      }

      //Scoreboard
      if (Line.includes('scoreboard objectives add')) {
         ProcessScoreboard(Line, Data, uri, Index);
      }

      //Tickingarea
      if (Line.includes('tickingarea add')) {
         ProcessTickingarea(Line, Data, uri, Index);
      }
   }

   Database.Set(uri, Data);
   return Data;
}

//Process the given tag
function ProcessTag(Line: string, Data: MinecraftData, uri: string, LineIndex: number): void {
   let Match = Line.match(/(tag .* add )(\w*)/);

   if (Match && Match.length >= 3) {
      let TagText = Match[2];
      let FindAt = Line.indexOf(TagText);

      let T = new Tag();
      T.Name = TagText;
      T.Location = Location.create(GetFilepath(uri), Range.create(LineIndex, FindAt, LineIndex, FindAt + TagText.length));

      Data.Tag.push(T);
   }
}

//Process the given objective
function ProcessScoreboard(Line: string, Data: MinecraftData, uri: string, LineIndex: number): void {
   let Match = Line.match(/(scoreboard objectives add )(\w*)( dummy)/);

   if (Match && Match.length >= 4) {
      let ObjectiveText = Match[2];
      let FindAt = Line.indexOf(ObjectiveText);

      let O = new Objective();
      O.Name = ObjectiveText;
      O.Location = Location.create(GetFilepath(uri), Range.create(LineIndex, FindAt, LineIndex, FindAt + ObjectiveText.length));

      Data.Objectives.push(O);
   }
}

//Process the given tickingarea
function ProcessTickingarea(Line: string, Data: MinecraftData, uri: string, LineIndex: number): void {
   //no circle tickingarea
   let Match = Line.match(/(tickingarea add [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d ]*)(\w*)/);

   if (Match && Match.length >= 3) {
      let TickingareaName = Match[2];
      let FindAt = Line.indexOf(TickingareaName);

      Data.Objectives.push(new Tickingarea(TickingareaName, uri, LineIndex, FindAt));
   }

   //no circle tickingarea
   Match = Line.match(/(tickingarea add circle [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d ]*)(\w*)/);

   if (Match && Match.length >= 3) {
      let TickingareaName = Match[2];
      let FindAt = Line.indexOf(TickingareaName);

      Data.Objectives.push(new Tickingarea(TickingareaName, uri, LineIndex, FindAt));
   }
}