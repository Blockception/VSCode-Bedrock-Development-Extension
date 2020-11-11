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
import { Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Database } from "../../database/include";
import { CommandIntr } from "../../minecraft/commands/include";
import { Tickingarea } from "../../minecraft/types/Tickingarea/include";

export function ProcessTickingAreaCommand(Command: CommandIntr, lineIndex: number, doc: TextDocument): void {
  //tickingarea add
  if (Command.Paramaters[1]?.text !== "add") return;

  //tickingarea add circle
  if (Command.Paramaters[2]?.text === "circle") {
    ProcessCircleCommand(Command);
  } else {
    ProcessBoxCommand(Command);
  }
}

function ProcessCircleCommand(Command: CommandIntr): void {
  //Tickingarea add circle <x> <y> <z> <r> [name]
  const Parameters = Command.Paramaters;

  if (Parameters.length < 7) return;

  let Area = "x: " + Parameters[3].text + "y: " + Parameters[4].text + "z: " + Parameters[5].text + "; radius: " + Parameters[6].text;
  let Name = "";
  const uri = Command.Paramaters[0].uri;

  let Location: Location;

  if (Parameters.length > 7) {
    Name = Parameters[7].text;
    Location = Parameters[7].CreateLocation();
  } else {
    Location = {
      uri: uri,
      range: {
        start: Parameters[3].range.start,
        end: Parameters[6].range.end,
      },
    };
  }

  Create(Location, Name, 'The circular tickingarea: "' + Name + '"; ' + Area);
}

function ProcessBoxCommand(Command: CommandIntr): void {
  //Tickingarea add <x> <y> <z> <x> <y> <z> [name]
  const Parameters = Command.Paramaters;

  if (Parameters.length < 8) return;

  let Area = "x: " + Parameters[2].text + "y: " + Parameters[3].text + "z: " + Parameters[4].text + ";";
  Area += "x: " + Parameters[5].text + "y: " + Parameters[6].text + "z: " + Parameters[7].text + ";";
  let Name = "";
  const uri = Command.Paramaters[0].uri;

  let Location: Location;

  if (Parameters.length > 8) {
    Name = Parameters[8].text;
    Location = Parameters[8].CreateLocation();
  } else {
    Location = {
      uri: uri,
      range: {
        start: Parameters[2].range.start,
        end: Parameters[7].range.end,
      },
    };
  }

  Create(Location, Name, 'The box tickingarea: "' + Name + '"; ' + Area);
}

function Create(Loc: Location, Name: string, Doc: string): void {
  let Ta = new Tickingarea();
  Ta.Location = Loc;
  Ta.Identifier = Name;
  Ta.Documentation.value = Doc;

  Database.Data.General.TickingAreas.Set(Ta);
}
