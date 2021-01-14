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
import { Position } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { LocationWord } from "../code/words/include";
import { ProcessScoreboardCommand, ProcessTickingAreaCommand } from "../process/Commands/include";
import { ProcessTagCommand } from "../process/Commands/Tag";
import { CommandIntr, GetSubCommand } from "../types/commands/Command Intertation/include";

export function ProcessCommand(Line: string, Start: Position, document: TextDocument): void {
  if (Line.startsWith("#")) return;
  let Command: CommandIntr | undefined = CommandIntr.parse(Line, { character: 0, line: 0 }, document.uri, Start);

  while (Command) {
    if (Command.Paramaters.length === 0) break;

    switch (Command.Paramaters[0].text) {
      case "tag":
        ProcessTagCommand(Command, document);
        break;

      case "scoreboard":
        ProcessScoreboardCommand(Command, document);
        break;

      case "tickingarea":
        ProcessTickingAreaCommand(Command);
        break;
    }

    Command = GetSubCommand(Command);
  }
}

export function ProcessWord(Word: LocationWord, document: TextDocument): void {
  return ProcessCommand(Word.text, Word.range.start, document);
}
