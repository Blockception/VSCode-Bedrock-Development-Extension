export class MCCommand {
	public parameters : MCCommandParameter[];
	public name : string

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