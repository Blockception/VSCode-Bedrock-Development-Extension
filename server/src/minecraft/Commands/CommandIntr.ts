import { Position } from 'vscode-languageserver-textdocument';
import { RangedWord } from '../../code/include';
import { Manager } from '../../Manager';
import { MCCommand } from './MCCommand';


//A class that helps interpeting written commands
//A class that helps interpeting written commands
export class CommandIntr {
	public Paramaters : RangedWord[];
	public Line : number;

	constructor(){
		this.Line = 0;
		this.Paramaters=[];
	}

	static parse(line : string, pos : Position) : CommandIntr {
		let Out = new CommandIntr();

		let LineIndex = pos.line;
		let Words = RangedWord.GetWords(line);
		Out.Line = LineIndex;
		Out.Paramaters = Words;		
		Out.Paramaters.forEach(x=>x.CheckCursor(pos.character));

		return Out;
	}

	slice(start? : number | undefined, end? : number | undefined): CommandIntr {
		let Out = new CommandIntr();
		Out.Line = this.Line;
		Out.Paramaters = Out.Paramaters.slice(start, end);

		return Out;
	}

	GetCommandKeyword() : string {
		return this.Paramaters[0].text;
	}

	GetCommandData() : MCCommand[] {
		let Out : MCCommand[] = [];

		let Keyword = this.GetCommandKeyword();

		Manager.Commands.forEach(x=>{
			if (x.name === Keyword){
				Out.push(x);
			}
		});

		return Out;
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
			if (character < command.Paramaters[11].startindex){
				return command.slice(11);
			}
		}
		else{
			//if cursor is on the execute command and not the sub command
			if (character < command.Paramaters[6].startindex){
				return command.slice(6);
			}
		}
	}

	return undefined;
}