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
import { Range, SemanticTokens } from 'vscode-languageserver';
import { Position, TextDocument } from 'vscode-languageserver-textdocument';
import { getLine } from '../code/include';
import { CommandIntr, GetSubCommand } from '../types/commands/Command Intertation/include';
import { MCCommandParameterType } from '../types/commands/Parameter/include';
import { McfunctionSemanticTokensBuilder } from './builders/McfunctionSemanticTokensBuilder';
import { SemanticTokensEnum } from './Legend';

export function ProvideMcfunctionSemanticTokens(doc: TextDocument, range?: Range | undefined): SemanticTokens {
	let Builder = new McfunctionSemanticTokensBuilder(doc);
	let startindex = 0
	let endindex = doc.lineCount;

	if (range) {
		startindex = range.start.line;
		endindex = range.end.line;
	}

	for (let I = startindex; I < endindex; I++) {
		let line = getLine(doc, I);

		let P: Position = { character: 0, line: I };
		let Command = CommandIntr.parse(line, P, Builder.doc.uri);
		CreateTokens(Command, Builder);
	}

	return Builder.Build();
}

export function McfunctionLineTokens(line: string, offset: number, Builder: McfunctionSemanticTokensBuilder): void {
	if (line.startsWith('/')) {
		line = line.substring(1, line.length);
		offset++;
	}

	let Command = CommandIntr.parse(line, Builder.PositionAt(offset), Builder.doc.uri);
	CreateTokens(Command, Builder);
}


function CreateTokens(Command: CommandIntr, Builder: McfunctionSemanticTokensBuilder): void {
	if (Command.Paramaters.length == 0)
		return;

	let First = Command.Paramaters[0];
	Builder.AddWord(First, SemanticTokensEnum.class);
	let Matches = Command.GetCommandData();
	let Match;

	if (Matches.length == 0)
		return;

	Match = Matches[0];

	let Max = Command.Paramaters.length;
	if (Match.Command.parameters.length < Max)
		Max = Match.Command.parameters.length;

	for (let I = 1; I < Max; I++) {
		let Data = Match.Command.parameters[I];
		let Word = Command.Paramaters[I];

		switch (Data.Type) {
			case MCCommandParameterType.command:
				let Sub = GetSubCommand(Command);
				if (Sub) {
					CreateTokens(Sub, Builder);
				}
				return;

			//Keywords
			case MCCommandParameterType.boolean:
				Builder.AddWord(Word, SemanticTokensEnum.keyword);
				break;

			//Values
			case MCCommandParameterType.block:
			case MCCommandParameterType.entity:
			case MCCommandParameterType.item:
			case MCCommandParameterType.particle:
			case MCCommandParameterType.sound:
			case MCCommandParameterType.tickingarea:
				Builder.AddWord(Word, SemanticTokensEnum.parameter);
				break;

			case MCCommandParameterType.coordinate:
			case MCCommandParameterType.float:
			case MCCommandParameterType.integer:
			case MCCommandParameterType.xp:
				Builder.AddWord(Word, SemanticTokensEnum.number);
				break;

			case MCCommandParameterType.keyword:
				Builder.AddWord(Word, SemanticTokensEnum.method);
				break;

			case MCCommandParameterType.function:
			case MCCommandParameterType.string:
				Builder.AddWord(Word, SemanticTokensEnum.string);
				break;

			case MCCommandParameterType.objective:
				Builder.AddWord(Word, SemanticTokensEnum.variable);
				break;

			case MCCommandParameterType.tag:
				Builder.AddWord(Word, SemanticTokensEnum.property);
				break;

			case MCCommandParameterType.operation:
				Builder.AddWord(Word, SemanticTokensEnum.operator);

			//Modes
			case MCCommandParameterType.cameraShakeType:
			case MCCommandParameterType.cloneMode:
			case MCCommandParameterType.difficulty:
			case MCCommandParameterType.effect:
			case MCCommandParameterType.event:
			case MCCommandParameterType.fillMode:
			case MCCommandParameterType.gamemode:
			case MCCommandParameterType.locateFeature:
			case MCCommandParameterType.maskMode:
			case MCCommandParameterType.mirror:
			case MCCommandParameterType.musicRepeatMode:
			case MCCommandParameterType.replaceMode:
			case MCCommandParameterType.rideRules:
			case MCCommandParameterType.rotation:
			case MCCommandParameterType.saveMode:
			case MCCommandParameterType.slotType:
			case MCCommandParameterType.slotID:
			case MCCommandParameterType.structureAnimationMode:
			case MCCommandParameterType.teleportRules:
				Builder.AddWord(Word, SemanticTokensEnum.enumMember);
				break;

			//json
			case MCCommandParameterType.jsonItem:
			case MCCommandParameterType.jsonRawText:
				break;

			//
			case MCCommandParameterType.teleportRules:
			case MCCommandParameterType.selector:
				break;

			default:
				break;
		}
	}
}