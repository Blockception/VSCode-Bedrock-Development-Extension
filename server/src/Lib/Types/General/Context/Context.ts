import { LocationWord } from "bc-vscode-words";
import { CommandInfo } from "../../Commands/Info/CommandInfo";
import { CommandIntr } from "../../Commands/Interpertation/CommandIntr";
import { MCCommandParameter } from "../../Commands/Parameter/include";

export interface BaseCommandContext {
  Parameter: MCCommandParameter;
  ParameterIndex: number;
  Command: CommandIntr;
  BestMatch: CommandInfo;
  Current: LocationWord | undefined;
}

export namespace BaseCommandContext {
  export function is(value: any): value is BaseCommandContext {
    if (value) {
      let temp = value as BaseCommandContext;

      if (temp.BestMatch && temp.Command && temp.Current && temp.Parameter && temp.ParameterIndex) return true;
    }

    return false;
  }
}
