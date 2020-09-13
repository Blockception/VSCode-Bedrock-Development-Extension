import { MCCommandParameterType } from './MCCommandParameterType';

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
