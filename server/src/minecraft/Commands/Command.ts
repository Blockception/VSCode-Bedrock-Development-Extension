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
import { RangedWord } from '../../code/include';
import { Manager } from '../../Manager';
import { Position } from 'vscode-languageserver-textdocument';

export class MCCommand {
	public name : string
	public parameters : MCCommandParameter[];	

	constructor(){
		this.parameters = [];
		this.name = '';
	}

	add(item : MCCommandParameter[]){
		if (this.parameters.length == 0){
			this.name = item[0].Text;
			this.parameters = item;
		}
		else{
			this.parameters.push(...item);
		}
	}
}

export class MCCommandParameter {
	public Text : string;
	public Type : MCCommandParameterType;
	public Required : boolean;

	constructor(){
		this.Text = '';
		this.Type = MCCommandParameterType.keyword;
		this.Required = true;
	}
}

export enum MCCommandParameterType {
	block,
	boolean,
	command,
	coordinate,
	effect,
	entity,
	event,
	function,
	float,
	integer,
	item,
	jsonItem,
	jsonRawText,
	keyword,
	objective,
	selector,
	sound,
	tag,
	xp
}

//A class that helps interpeting written commands
export class CommandIntr {
	public Paramaters : RangedWord[];
	public Line : number;

	constructor(){
		this.Line = 0;
		this.Paramaters=[];
	}

	static parse(line : string, pos : Position) : CommandIntr {
		var Out = new CommandIntr();

		var LineIndex = pos.line;
		var Words = RangedWord.GetWords(line);
		Out.Line = LineIndex;
		Out.Paramaters = Words;		
		Out.Paramaters.forEach(x=>x.CheckCursor(pos.character));

		return Out;
	}

	slice(start? : number | undefined, end? : number | undefined): CommandIntr {
		var Out = new CommandIntr();
		Out.Line = this.Line;
		Out.Paramaters = Out.Paramaters.slice(start, end);

		return Out;
	}

	GetCommandKeyword() : string {
		return this.Paramaters[0].text;
	}

	GetCommandData() : MCCommand[] {
		var Out : MCCommand[] = [];

		var Keyword = this.GetCommandKeyword();

		Manager.Commands.forEach(x=>{
			if (x.name === Keyword){
				Out.push(x);
			}
		});

		return Out;
	}
}