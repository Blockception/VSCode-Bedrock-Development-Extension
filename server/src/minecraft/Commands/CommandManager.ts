import { Manager } from '../../Manager';
import { isBoolean } from '../types/Boolean';
import { CommandIntr } from './CommandIntr';
import { MCCommand } from './MCCommand';
import { MCCommandParameterType } from './MCCommandParameterType';

export class CommandManager {
	Subset : Map<string, MCCommand[]>;

	constructor() {
		this.Subset = new Map<string, MCCommand[]>();
	}

	add(com : MCCommand) : void {
		var Storage = this.Subset.get(com.name);

		if (Storage == undefined){
			this.Subset.set(com.name, [com]);
		}
		else{
			Storage.push(com);
		}
	}

	get(com : string) : MCCommand[] {
		var Storage = this.Subset.get(com);

		if (Storage == undefined){
			return [];
		}

		return Storage;
	}

	has(com : string) : boolean {
		return this.Subset.has(com);
	}

	getBestMatches(com : CommandIntr) : MCCommand[] {
		var Storage = this.Subset.get(com.GetCommandKeyword());
		var Out : MCCommand[]  = [];

		if (Storage == undefined){
			return Out;
		}

		for (var I = 0; I < Storage.length; I++){

		}

		return Out;
	}
}

function isMatch(com : CommandIntr, pattern : MCCommand) : boolean {
	var Limit = pattern.parameters.length;

	if (Limit > com.Paramaters.length){
		Limit = com.Paramaters.length;
	}

	for (var I = 0; I < Limit; I++) {
		var comPar = com.Paramaters[I];
		var comText = comPar.text;
		var patPar = pattern.parameters[I];

		switch(patPar.Type){
			case MCCommandParameterType.block:
			case MCCommandParameterType.coordinate:
			case MCCommandParameterType.effect:
			case MCCommandParameterType.entity:
			case MCCommandParameterType.event:
			case MCCommandParameterType.float:
			case MCCommandParameterType.function:
			case MCCommandParameterType.integer:
			case MCCommandParameterType.item:
			case MCCommandParameterType.jsonItem:
			case MCCommandParameterType.jsonRawText:
			case MCCommandParameterType.objective:
			case MCCommandParameterType.selector:
			case MCCommandParameterType.sound:
			case MCCommandParameterType.tag:
			case MCCommandParameterType.xp:
				//TODO program matches types for these
				continue;

			case MCCommandParameterType.boolean:
				if (!isBoolean(comPar.text))
					return false;

			case MCCommandParameterType.command:
				if (!Manager.Commands.has(comText))
					return false;

			case MCCommandParameterType.keyword:
				if (comText != patPar.Text)
					return false;
		}
	}

	return true;
}