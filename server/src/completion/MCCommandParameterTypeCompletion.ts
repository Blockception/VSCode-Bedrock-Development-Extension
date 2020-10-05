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
import { CompletionItem, CompletionItemKind, CompletionList } from 'vscode-languageserver';
import { RangedWord } from '../code/include';
import { MCCommandParameter, MCCommandParameterType } from '../minecraft/commands/include';
import { provideBooleanCompletion } from '../minecraft/types/Boolean/Completion';
import { provideBlockCompletion, provideEntityCompletion, provideSelectorCompletion, provideSelectorPlayerCompletion, provideSelectorTargetCompletion, provideTagCompletion } from '../minecraft/types/include';
import { provideCommandCompletion } from './CommandCompletion';

function toCompletion(parameter: MCCommandParameter): CompletionItem {
	let Out: CompletionItem = {
		label: parameter.Text,
		documentation: "keyword",
		kind: CompletionItemKind.Keyword
	};

	return Out;
}

export function ProvideCompletionMCCommandParameter(Parameter: MCCommandParameter, receiver: CompletionList, Current: RangedWord | undefined): void {
	switch (Parameter.Type) {
		case MCCommandParameterType.block:
			provideBlockCompletion(receiver);
			break;

		case MCCommandParameterType.boolean:
			provideBooleanCompletion(receiver);
			break;

		case MCCommandParameterType.command:
			provideCommandCompletion(receiver);
			break;

		case MCCommandParameterType.coordinate:
			//TODO
			break;

		case MCCommandParameterType.effect:
			//TODO
			break;

		case MCCommandParameterType.entity:
			provideEntityCompletion(receiver);
			break;

		case MCCommandParameterType.event:
			//TODO
			break;

		case MCCommandParameterType.float:
			//TODO
			break;

		case MCCommandParameterType.function:
			//TODO
			break;

		case MCCommandParameterType.gamemode:
			//TODO
			break;

		case MCCommandParameterType.integer:
			//TODO
			break;

		case MCCommandParameterType.item:
			//TODO
			break;

		case MCCommandParameterType.jsonItem:
			//TODO
			break;

		case MCCommandParameterType.jsonRawText:
			//TODO
			break;

		case MCCommandParameterType.keyword:
			receiver.items.push(toCompletion(Parameter));
			break;

		case MCCommandParameterType.objective:
			//TODO
			break;

		case MCCommandParameterType.selector:
			provideSelectorCompletion(receiver, Current);
			break;

		case MCCommandParameterType.selectorPlayer:
			provideSelectorPlayerCompletion(receiver, Current);
			break;

		case MCCommandParameterType.selectorTarget:
			provideSelectorTargetCompletion(receiver, Current);
			break;

		case MCCommandParameterType.tag:
			provideTagCompletion(receiver);
			break;
	}
}

