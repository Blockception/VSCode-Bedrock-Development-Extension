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
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../../Lib/Code/include";
import { Console } from "../../Console/Console";
import { Database } from "../../Database/Database";
import { Manager } from "../../Manager/include";
import { CommandIntr } from "../../Types/Commands/Interpertation/include";
import { Tag } from "../../Types/General/Tag/Tag";
import { GetComment } from "../../Types/Minecraft/Behavior/Functions/include";

export function ProcessTagCommand(Com: CommandIntr, doc: TextDocument): void {
  //tag <selector> add <tag>
  if (Com.Parameters[2]?.text !== "add") return;

  let tag = Com.Parameters[3];

  let Data = new Tag();
  Data.Identifier = tag.text;
  Data.Location = tag.location;

  let Comment = GetComment(getLine(doc, Com.Line));

  if (Comment !== "") {
    Data.Documentation.value = Comment;
  } else {
    Data.Documentation.value = "The tag: " + tag.text;
  }

  Console.Info("Found tag: " + tag.text);
  Database.Data.General.Tag.Set(Data);
}
