import { MCCommandParameter } from "../Parameter/Parameter";
import { MarkupContent } from "vscode-languageserver";
import { MCCommandParameterType } from "../Parameter/include";

export class MCCommand {
  public name: string;
  public parameters: MCCommandParameter[];
  public documentation: MarkupContent;

  constructor() {
    this.parameters = [];
    this.name = "";
    this.documentation = { kind: "markdown", value: "" };
  }

  add(item: MCCommandParameter[]) {
    if (this.parameters.length == 0) {
      this.name = item[0].Text;
      this.parameters = item;
    } else {
      this.parameters.push(...item);
    }
  }

  includes(value: string | MCCommandParameterType): boolean {
    if (typeof value === "string") {
      for (let I = 0; I < this.parameters.length; I++) {
        if (this.parameters[I].Text === value) return true;
      }
    } else {
      for (let I = 0; I < this.parameters.length; I++) {
        if (this.parameters[I].Type === value) return true;
      }
    }

    return false;
  }

  getIndexOfType(type: MCCommandParameterType): number {
    for (let I = 0; I < this.parameters.length; I++) {
      if (this.parameters[I].Type === type) return I;
    }

    return -1;
  }

  getIndexOfTypeReverse(type: MCCommandParameterType, startindex: number = -1): number {
    if (startindex < 0 || startindex >= this.parameters.length) startindex = this.parameters.length - 1;

    for (let I = startindex; I >= 0; I--) {
      if (this.parameters[I].Type === type) return I;
    }

    return -1;
  }
}
