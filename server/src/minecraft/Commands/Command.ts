

export class Command {
	public parameters : CommandParameter[];
	public name : string

	constructor(){
		this.parameters = [];
		this.name = '';
	}

	add(item : CommandParameter[]){
		if (this.parameters.length == 0){
			this.name = item[0].Text;
			this.parameters = item;
		}
		else{
			this.parameters.push(...item);
		}
	}
}

export class CommandParameter {
	public Text : string;
	public Type : CommandParameterType;

	constructor(){
		this.Text = '';
		this.Type = CommandParameterType.keyword;
	}
}

export enum CommandParameterType {
	keyword,
	selector,
	coordinate,
	integer,
	float,
	objective,
	entity,
	block,
	item,
	sound,
	event
}