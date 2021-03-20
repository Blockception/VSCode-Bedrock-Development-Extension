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
import { LocationWord } from "bc-vscode-words";
import { Position } from "vscode-languageserver-textdocument";
import { Range } from "../../../Code/Range";
import { CreateMinecraftCommandWords } from "../../../commands/Words";
import { Manager } from "../../../manager/Manager";
import { CommandInfo } from "../info/CommandInfo";
import { MCCommandParameterType } from "../parameter/include";

/**
 *A class that helps interpeting written commands
 */
export class CommandIntr {
  /**
   * The parameters of the command
   */
  public Parameters: LocationWord[];
  /**
   * The line the command is comming from
   */
  public Line: number;
  /**
   * The index of parameter, that the cursor is in.
   */
  public CursorParamater: number;

  constructor() {
    this.Line = 0;
    this.CursorParamater = 0;
    this.Parameters = [];
  }

  static parse(line: string, cursor: Position, uri: string, startPos: Position | undefined = undefined): CommandIntr {
    let Out = new CommandIntr();

    if (!startPos) {
      startPos = { character: 0, line: 0 };
    }

    line = line.trim();

    let Words = LocationWord.Text.Parse(line, uri, CreateMinecraftCommandWords, startPos);
    let char = cursor.character;

    Out.Line = startPos.line;
    Out.Parameters = Words;

    if (Out.Parameters.length > 0) {
      if (Out.Parameters[Out.Parameters.length - 1].location.range.end.character < char) {
        Out.CursorParamater = Out.Parameters.length;
      } else {
        for (let I = 0; I < Out.Parameters.length; I++) {
          let x = Out.Parameters[I];
          let r = x.location.range;

          if (Range.Within(r, cursor)) {
            Out.CursorParamater = I;
            break;
          } else if (r.end.character < char) {
            Out.CursorParamater = I + 1;
          }
        }
      }
    }

    return Out;
  }

  slice(start?: number | undefined, end?: number | undefined): CommandIntr {
    let Out = new CommandIntr();
    Out.Line = this.Line;
    Out.Parameters = this.Parameters.slice(start, end);
    Out.CursorParamater = this.CursorParamater - (start ?? 0);

    return Out;
  }

  GetCommandKeyword(): string {
    if (this.Parameters.length <= 0) return "";

    return this.Parameters[0].text;
  }

  /**
   *Gets all the command data that is the possible best match data
   */
  GetCommandData(): CommandInfo[] {
    return Manager.Data.Commands.getBestMatches(this);
  }

  /**
   *Gets the current word
   */
  GetCurrent(): LocationWord | undefined {
    if (this.CursorParamater >= 0 && this.CursorParamater < this.Parameters.length) return this.Parameters[this.CursorParamater];

    return undefined;
  }

  /**
   *
   * @returns
   */
  IsEmpty(): Boolean {
    if (this.Parameters.length <= 0) return true;

    return false;
  }
}

export function IsInSubCommand(command: CommandIntr, character: number): CommandIntr | undefined {
  //execute command hasn't been completed yet
  if (command.Parameters.length < 6) return undefined;

  let Keyword = command.GetCommandKeyword();

  if (Keyword == "execute") {
    if (command.Parameters[5].text === "detect") {
      //execute detect command hasn't been completed yet
      if (command.Parameters.length < 12) return undefined;

      //if cursor is on the sub command and not the execute command
      if (character >= command.Parameters[11].location.range.start.character) {
        return command.slice(11);
      }
    } else {
      //if cursor is on the sub command and not the execute command
      if (character >= command.Parameters[5].location.range.start.character) {
        return command.slice(5);
      }
    }
  }

  return undefined;
}

export function GetSubCommand(command: CommandIntr): CommandIntr | undefined {
  let Matches = command.GetCommandData();

  if (Matches.length === 0) {
    return;
  }

  let Item = Matches[0];
  let index = Item.Command.getIndexOfType(MCCommandParameterType.command);

  if (index > -1 && index < command.Parameters.length) {
    return command.slice(index);
  }

  return undefined;
}
