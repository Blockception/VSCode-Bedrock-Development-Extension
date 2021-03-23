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
import { CommandIntr } from "../../Types/Commands/Interpertation/include";
import { FakeEntity } from "../../Types/General/FakeEntity/include";
import { Objective } from "../../Types/General/Objectives/include";
import { IsFakePlayer } from "../../Types/General/Selector/include";
import { GetComment } from "../../Types/Minecraft/Behavior/Functions/include";

export function ProcessScoreboardCommand(Com: CommandIntr, doc: TextDocument): void {
  if (Com.Parameters.length < 3) {
    return;
  }

  let Comment = GetComment(getLine(doc, Com.Line));
  let Mode = Com.Parameters[1];

  switch (Mode.text) {
    case "players":
      return CheckPlayer(Com, Comment);

    case "objectives":
      return CheckObjective(Com, Comment);
  }
}

function CheckObjective(Com: CommandIntr, Comment: string): void {
  let ObjectiveMode = Com.Parameters[2];

  if (Com.Parameters.length < 4) {
    return;
  }

  if (ObjectiveMode.text === "add") {
    let obj = new Objective();

    let ID = Com.Parameters[3];
    let Type = Com.Parameters[4];
    obj.Identifier = ID.text;
    obj.Type = Type.text;
    obj.Location = ID.location;

    if (Comment === "") {
      obj.Documentation.value = "The objective: " + ID.text + " " + Type.text;

      if (Com.Parameters.length > 5) {
        obj.Documentation.value += " " + Com.Parameters[5].text.replace(/"/g, "");
      }
    } else {
      obj.Documentation.value = Comment;
    }

    Console.Info(`Found objective: ${obj.Identifier}`);
    Database.Data.General.Objectives.Set(obj);
  }
}

function CheckPlayer(Com: CommandIntr, Comment: string): void {
  if (Com.Parameters.length > 3) {
    let Selector = Com.Parameters[3];

    if (IsFakePlayer(Selector.text)) {
      let FE = new FakeEntity();

      FE.Identifier = Selector.text;
      FE.Location = Selector.location;

      if (Comment !== "") {
        FE.Documentation.value = "The fake player: " + FE.Identifier;
      } else {
        FE.Documentation.value = Comment;
      }

      Console.Info(`Found fake player: ${FE.Identifier}`);
      Database.Data.General.FakeEntities.Set(FE);
    }
  }
}
