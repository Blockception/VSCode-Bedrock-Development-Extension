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
import { Diagnostic } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { getLine, LocationWord } from '../../../code/include';
import { Database } from '../../../database/include';
import { CommandIntr, GetSubCommand, MCCommandParameter, MCCommandParameterType } from '../../../minecraft/commands/include';
import { ValidationData } from '../../../validation/include';
import { DiagnoseBlock, DiagnoseBoolean, DiagnoseGamemode, DiagnoseKeyword, DiagnoseObjective, DiagnoseParticle, DiagnoseTag, DiagnoseTickingarea } from './parameters/include';


/**
 * 
 * @param doc 
 * @param validation 
 */
export function Diagnose(doc: TextDocument, validation: ValidationData) {
	let receiver: Diagnostic[] = [];

	if (doc.uri.includes('quest_reset')) {
		let hi = '';
	}

	try {
		for (let index = 0; index < doc.lineCount; index++) {
			const line = getLine(doc, index);
			DiagnoseLine(line, index, validation, receiver);
		}
	}
	catch (error) {
		receiver.push({
			message: JSON.stringify(error),
			range: { start: { character: 0, line: 0 }, end: { character: 1, line: 0 } }
		})
	}

	Database.Diagnotics.SetErrors(doc.uri, receiver);
}

/**
 * 
 * @param line 
 * @param lineIndex 
 * @param validation 
 * @param receiver 
 */
export function DiagnoseLine(line: string, lineIndex: number, validation: ValidationData, receiver: Diagnostic[]): void {
	line = line.trim();

	if (line === '' || line === '\r\n')
		return;

	if (line.startsWith('scoreboard players set CH3')) {
		line = line;
	}

	let Command = CommandIntr.parse(line, { character: 0, line: lineIndex }, '');

	if (Command.Paramaters.length === 0)
		return;

	DiagnoseCommand(Command, line, validation, receiver);


	let Sub = GetSubCommand(Command);
	while (Sub) {
		DiagnoseCommand(Sub, line, validation, receiver);
		Sub = GetSubCommand(Sub);
	}
}

/**
 * 
 * @param Command 
 * @param line 
 * @param validation 
 * @param receiver 
 */
function DiagnoseCommand(Command: CommandIntr, line: string, validation: ValidationData, receiver: Diagnostic[]): void {
	let Matches = Command.GetCommandData();

	if (Matches.length === 0) {
		receiver.push({ message: 'Unknown command syntax: "' + line + '"', range: Command.Paramaters[0].range });
		return;
	}

	let Data = Matches[0];
	let max = Data.Command.parameters.length;

	if (Command.Paramaters.length < max) {
		max = Command.Paramaters.length;
	}

	for (let I = 0; I < Data.Command.parameters.length; I++) {
		DiagnoseParameter(Data.Command.parameters[I], Command.Paramaters[I], validation, receiver);
	}
}

/**
 * Diagnoses the single parameter
 * @param pattern 
 * @param data 
 * @param validation 
 * @param receiver 
 */
function DiagnoseParameter(pattern: MCCommandParameter, data: LocationWord, validation: ValidationData, receiver: Diagnostic[]): void {
	if (pattern === undefined || data === undefined)
		return;

	if (pattern.Options) {
		//If wildcard is allowed and the text is an wildcard, then skip diagnose
		if (pattern.Options.wildcard && pattern.Options.wildcard === true) {
			if (data.text === '*')
				return;
		}

		//If accepted values is filled in and the text is a match, then skip diagnose
		if (pattern.Options.acceptedValues) {
			if (pattern.Options.acceptedValues.includes(data.text)) {
				return;
			}
		}
	}

	switch (pattern.Type) {
		case MCCommandParameterType.block:
			return DiagnoseBlock(data, receiver);

		case MCCommandParameterType.boolean:
			return DiagnoseBoolean(data, receiver);

		case MCCommandParameterType.command:
		case MCCommandParameterType.coordinate:
		case MCCommandParameterType.effect:
		case MCCommandParameterType.entity:
		case MCCommandParameterType.event:
		case MCCommandParameterType.float:
		case MCCommandParameterType.function:
			return;

		case MCCommandParameterType.gamemode:
			return DiagnoseGamemode(data, receiver);

		case MCCommandParameterType.integer:
		case MCCommandParameterType.integerTest:
		case MCCommandParameterType.item:
		case MCCommandParameterType.jsonItem:
		case MCCommandParameterType.jsonRawText:
			return;

		case MCCommandParameterType.keyword:
			return DiagnoseKeyword(pattern, data, receiver);

		case MCCommandParameterType.locateFeature:
			return;
		case MCCommandParameterType.objective:
			return DiagnoseObjective(data, validation, receiver);

		case MCCommandParameterType.operation:
			return;

		case MCCommandParameterType.particle:
			return DiagnoseParticle(data, receiver);

		case MCCommandParameterType.replaceMode:
		case MCCommandParameterType.selector:
		case MCCommandParameterType.slotID:
		case MCCommandParameterType.slotType:
		case MCCommandParameterType.sound:
		case MCCommandParameterType.string:
			return;

		case MCCommandParameterType.tag:
			return DiagnoseTag(data, validation, receiver);

		case MCCommandParameterType.target:
			return;

		case MCCommandParameterType.tickingarea:
			return DiagnoseTickingarea(data, receiver)

		case MCCommandParameterType.unknown:
		case MCCommandParameterType.xp:
			return;
	}
}