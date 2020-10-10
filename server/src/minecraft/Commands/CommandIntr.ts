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
import { Position } from 'vscode-languageserver-textdocument';
import { RangedWord } from '../../code/include';
import { Manager } from '../../Manager';
import { CommandInfo } from './CommandInfo';

/**
 *A class that helps interpeting written commands 
 */
export class CommandIntr {
	/**
	 * The parameters of the command
	 */
	public Paramaters: RangedWord[];
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
		this.Paramaters = [];
	}

	static parse(line: string, pos: Position): CommandIntr {
		let Out = new CommandIntr();

		let LineIndex = pos.line;
		let Words = RangedWord.GetWords(line);
		let char = pos.character;
		Out.Line = LineIndex;
		Out.Paramaters = Words;

		if (Out.Paramaters.length > 0) {
			if (Out.Paramaters[Out.Paramaters.length - 1].endindex < pos.character) {
				Out.CursorParamater = Out.Paramaters.length;
			}
			else {
				for (let I = 0; I < Out.Paramaters.length; I++) {
					let x = Out.Paramaters[I];

					if (x.CheckCursor(char)) {
						Out.CursorParamater = I;
						break;
					}
					else if (char > x.endindex) {
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
		Out.Paramaters = Out.Paramaters.slice(start, end);

		return Out;
	}

	GetCommandKeyword(): string {
		if (this.Paramaters.length <= 0)
			return '';

		return this.Paramaters[0].text;
	}

	/**
	 *Gets all the command data that is the possible best match data 
	 */
	GetCommandData(): CommandInfo[] {
		return Manager.Commands.getBestMatches(this);
	}

	/**
	 *Gets the current word
	 */
	GetCurrent(): RangedWord | undefined {
		if (this.CursorParamater >= 0 && this.CursorParamater < this.Paramaters.length)
			return this.Paramaters[this.CursorParamater];

		return undefined;
	}

	IsEmpty(): Boolean {
		if (this.Paramaters.length <= 0)
			return true;

		return false;
	}
}

export function IsInSubCommand(command: CommandIntr, character: number): CommandIntr | undefined {
	//execute command hasn't been completed yet
	if (command.Paramaters.length < 6)
		return undefined;

	let Keyword = command.GetCommandKeyword();

	if (Keyword == 'execute') {
		if (command.Paramaters[6].text === 'detect') {
			//execute detect command hasn't been completed yet
			if (command.Paramaters.length < 11)
				return undefined;

			//if cursor is on the execute command and not the sub command
			if (character < command.Paramaters[11].startindex) {
				return command.slice(11);
			}
		}
		else {
			//if cursor is on the execute command and not the sub command
			if (character < command.Paramaters[6].startindex) {
				return command.slice(6);
			}
		}
	}

	return undefined;
}