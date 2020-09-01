/*BSD 3-Clause License

Copyright (c) 2020, blockception Ltd
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

import { GetWords } from '../../code/include';
import { MCCommandParameter, MCCommand, MCCommandParameterType } from './Command';
import { Manager } from '../../Manager';

export function AddCommand(command: string, description : string | undefined = undefined) {
	let Words = GetWords(command);

	if (Words.length == 0)
		return;

	let Parameters: MCCommandParameter[] = [];

	for (let I = 0; I < Words.length; I++) {
		Parameters.push(ConvertWord(Words[I]));
	}

	let Command: MCCommand = new MCCommand();
	Command.add(Parameters);

	if (description != undefined){
		Command.description = description;
	}

	Manager.Commands.push(Command);
}

function ConvertWord(word: string): MCCommandParameter {
	let Out = new MCCommandParameter();

	//is required
	if (word.startsWith('<') && word.endsWith('>')) {
		word = word.substring(1, word.length - 1);
		Out.Required = true;
	}

	//is optional
	if (word.startsWith('[') && word.endsWith(']')) {
		word = word.substring(1, word.length - 1);
		Out.Required = false;
	}

	//has type
	if (word.includes(':')) {
		const index = word.indexOf(':');
		const Type = word.substring(index + 1, word.length).trim();
		word = word.substring(0, index).trim();

		switch (Type) {
			case 'block':
				Out.Type = MCCommandParameterType.block;
				break;
			
			case 'boolean':
				Out.Type = MCCommandParameterType.boolean;
				break;
			
			case 'command':
				Out.Type = MCCommandParameterType.command;
				break;
			
			case 'coordinate':
				Out.Type = MCCommandParameterType.coordinate;
				break;
			
			case 'effect':
				Out.Type = MCCommandParameterType.effect;
				break;
			
			case 'entity':
				Out.Type = MCCommandParameterType.entity;
				break;
			
			case 'event':
				Out.Type = MCCommandParameterType.event;
				break;
			
			case 'function':
				Out.Type = MCCommandParameterType.function;
				break;
			
			case 'float':
				Out.Type = MCCommandParameterType.float;
				break;
			
			case 'integer':
				Out.Type = MCCommandParameterType.integer;
				break;
			
			case 'item':
				Out.Type = MCCommandParameterType.item;
				break;
			
			case 'jsonItem':
				Out.Type = MCCommandParameterType.jsonItem;
				break;
			
			case 'jsonRawText':
				Out.Type = MCCommandParameterType.jsonRawText;
				break;
			
			case 'keyword':
				Out.Type = MCCommandParameterType.keyword;
				break;
			
			case 'objective':
				Out.Type = MCCommandParameterType.objective;
				break;
			
			case 'selector':
				Out.Type = MCCommandParameterType.selector;
				break;
			
			case 'sound':
				Out.Type = MCCommandParameterType.sound;
				break;
			
			case 'tag':
				Out.Type = MCCommandParameterType.tag;
				break;
			
			case 'xp':
				Out.Type = MCCommandParameterType.xp;
				break;
		}
	}

	Out.Text = word.trim();

	return Out;
}
