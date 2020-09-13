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

import { IDocument } from '../code/include';
import { Position } from 'vscode-languageserver-textdocument';
import { CompletionItem, CompletionItemKind, CompletionList } from 'vscode-languageserver';
import { CommandIntr, MCCommandParameter, MCCommandParameterType } from '../minecraft/commands/include';
import { Manager } from '../Manager';
import { provideBooleanCompletion } from '../minecraft/types/Boolean';

export function OnCompletionMcFunction(doc : IDocument, pos : Position, receiver : CompletionList) {
	const LineIndex = pos.line;
	const Line = doc.getLine(LineIndex);

	if (Line.length === 0)
		return;

	let Command: CommandIntr = CommandIntr.parse(Line, pos);

	return ProvideCompletionMcFunction(Command, pos, receiver);
}

export function ProvideCompletionMcFunction(Command : CommandIntr, pos : Position, receiver : CompletionList) {
	if (pos.character < 3){
		provideCommandCompletion(receiver);
		return;
	}

	let Matches = Command.GetCommandData();
	let ParameterIndex = Command.CursorParamater;

	if (Matches.length === 0){
		provideCommandCompletion(receiver);
		return;
	}
		
	for (let I = 0; I < Matches.length; I++){
		let Match = Matches[I];

		if (Match.Command.parameters.length > ParameterIndex) {
			var Parameter = Match.Command.parameters[ParameterIndex];

			switch (Parameter.Type){
				case MCCommandParameterType.boolean:
					provideBooleanCompletion(receiver);
					break;

				case MCCommandParameterType.command:
					provideCommandCompletion(receiver);
					break;

				case MCCommandParameterType.keyword:
					receiver.items.push(toCompletion(Parameter));
					break;
			}
		}
	}
}

function toCompletion(parameter : MCCommandParameter) : CompletionItem {
	let Out : CompletionItem = {
		label: parameter.Text,
		documentation: "keyword",
		kind:CompletionItemKind.Keyword
	};
	
	return Out;
}

function provideCommandCompletion(receiver : CompletionList) : void {
	for (let [key, value] of Manager.Commands.Subset){
		receiver.items.push({
			label:key,
			documentation:"The command: " + key,
			kind:CompletionItemKind.Class
		});
	}
}