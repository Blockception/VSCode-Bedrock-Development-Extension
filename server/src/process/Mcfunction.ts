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
import { Database } from '../minecraft/Database';
import { MinecraftData } from '../minecraft/Minecraft Data';
import { Tag } from '../minecraft/types/Tag';
import { Objective } from '../minecraft/types/Objectives';
import { GetFilename } from '../code/File';
import { Tickingarea } from '../minecraft/types/include';
import { IDocument } from '../code/include';

export function Process(document: IDocument): MinecraftData {
   var uri = document.Uri;
   console.log('Processing mcfunction: ' + GetFilename(uri));
   var Data = new MinecraftData();   

   for (var Index = 0; Index < document.LineCount; Index++) {
      const Line = document.getLine(Index);

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
   var Match = Line.match(/(tag .* add )(\w*)/);

   if (Match && Match.length >= 3) {
      var TagText = Match[2];
      var FindAt = Line.indexOf(TagText);

      Data.Tag.push(new Tag(TagText, uri, LineIndex, FindAt));
   }
}

//Process the given objective
function ProcessScoreboard(Line: string, Data: MinecraftData, uri: string, LineIndex: number): void {
   var Match = Line.match(/(scoreboard objectives add )(\w*)( dummy)/);

   if (Match && Match.length >= 4) {
      var ObjectiveText = Match[2];
      var FindAt = Line.indexOf(ObjectiveText);

      Data.Objectives.push(new Objective(ObjectiveText, uri, LineIndex, FindAt));
   }
}

//Process the given tickingarea
function ProcessTickingarea(Line: string, Data: MinecraftData, uri: string, LineIndex: number): void {
   //no circle tickingarea
   var Match = Line.match(/(tickingarea add [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d ]*)(\w*)/);

   if (Match && Match.length >= 3) {
      var TickingareaName = Match[2];
      var FindAt = Line.indexOf(TickingareaName);

      Data.Objectives.push(new Tickingarea(TickingareaName, uri, LineIndex, FindAt));
   }

   //no circle tickingarea
   var Match = Line.match(/(tickingarea add circle [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d]* [\^\~\+\-\d ]*)(\w*)/);

   if (Match && Match.length >= 3) {
      var TickingareaName = Match[2];
      var FindAt = Line.indexOf(TickingareaName);

      Data.Objectives.push(new Tickingarea(TickingareaName, uri, LineIndex, FindAt));
   }
}