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
import { Position, TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionList } from 'vscode-languageserver';
import { CommandIntr } from '../minecraft/commands/include';
import { ProvideCompletionMCCommandParameter } from './MCCommandParameterTypeCompletion';
import { provideCommandCompletion } from './CommandCompletion';
import { getLine } from '../code/include';

export function OnCompletionMcFunction(doc: TextDocument, pos: Position, receiver: CompletionList) : void {
	const LineIndex = pos.line;
	const Line = getLine(doc, LineIndex);

	let Command: CommandIntr = CommandIntr.parse(Line, pos);

	ProvideCompletionMcFunction(doc, pos, receiver, Command);
}

export function ProvideCompletionMcFunction(doc: TextDocument, pos: Position, receiver: CompletionList, Command: CommandIntr, ): void {
	if (Command == undefined || pos.character < 3) {
		provideCommandCompletion(receiver);
		return;
	}

	let Matches = Command.GetCommandData();

	if (Matches.length === 0) {
		if (pos.character < 10)
			provideCommandCompletion(receiver);

		return;
	}

	let ParameterIndex = Command.CursorParamater;
	let Current = Command.GetCurrent();

	for (let I = 0; I < Matches.length; I++) {
		let Match = Matches[I];

		if (Match.Command.parameters.length > ParameterIndex) {
			var Parameter = Match.Command.parameters[ParameterIndex];
			ProvideCompletionMCCommandParameter(Parameter, Command, pos.character, receiver, Current);
		}
	}
}



