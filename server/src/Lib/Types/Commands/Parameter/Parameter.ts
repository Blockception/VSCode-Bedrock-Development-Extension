import { ParameterOptions } from "./Parameter Options";
import { MCCommandParameterType } from "./ParameterType";

export class MCCommandParameter {
  public Text: string;
  public Type: MCCommandParameterType;
  public Required: boolean;
  public Options: ParameterOptions | undefined;

  constructor(Text: string = "", Type = MCCommandParameterType.keyword, Required = true) {
    this.Text = Text;
    this.Type = Type;
    this.Required = Required;
    this.Options = undefined;
  }
}
