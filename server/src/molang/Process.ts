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
import { Position, Range, TextDocument } from "vscode-languageserver-textdocument";
import { LocationWord } from "../code/words/include";
import { commands } from "../include";
import { DataCollector } from "./files/Data Collector";

export function Process(text: string, Start: Position, doc: TextDocument) {
  if (text.startsWith("/")) {
    let command = text.substring(1);
    commands.ProcessCommand(command, { character: Start.character + 1, line: Start.line }, doc);
  } else if (text.startsWith("@s ")) {
    //Process event
  } else {
    //Process general molang
  }
}

export function ProcessInto(text: string, range: Range, doc: TextDocument, receiver: DataCollector) {
  if (text.startsWith("/")) {
    range.start.character += 1;
    receiver.Command.push(new LocationWord(text.substring(1), range, doc.uri));
  } else if (text.startsWith("@s ")) {
    range.start.character += 3;
    receiver.Events.push(new LocationWord(text.substring(3), range, doc.uri));
  } else {
    receiver.Molang.push(new LocationWord(text, range, doc.uri));
  }
}
