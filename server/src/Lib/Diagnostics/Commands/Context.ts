import { LocationWord } from "bc-vscode-words";
import { CommandInfo } from "../../Types/Commands/Info/include";
import { CommandIntr } from "../../Types/Commands/Interpertation/include";
import { MCCommandParameter } from "../../Types/Commands/Parameter/include";
import { BaseCommandContext } from "../../Types/General/Context/Context";
import { DiagnosticsBuilder } from "../include";

/**
 *
 */
export interface CommandDiagnoseContext extends BaseCommandContext {
  Parameter: MCCommandParameter;
  ParameterIndex: number;
  Command: CommandIntr;
  BestMatch: CommandInfo;
  receiver: DiagnosticsBuilder;
  Current: LocationWord | undefined;
}

/**
 *
 */
export namespace CommandDiagnoseContext {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is CommandDiagnoseContext {
    if (value) {
      let temp = value as CommandDiagnoseContext;

      if (temp.Parameter && temp.Command && temp && temp.receiver) return true;
    }

    return false;
  }

  /**
   *
   * @param Parameter
   * @param Command
   * @param pos
   * @param receiver
   * @param Current
   * @returns
   */
  export function create(
    Parameter: MCCommandParameter,
    ParameterIndex: number,
    Command: CommandIntr,
    receiver: DiagnosticsBuilder,
    Current: LocationWord | undefined = undefined
  ): CommandDiagnoseContext {
    let BestMatch = Command.GetCommandData()[0];

    return {
      Parameter: Parameter,
      ParameterIndex: ParameterIndex,
      Command: Command,
      BestMatch: BestMatch,
      receiver: receiver,
      Current: Current,
    };
  }
}
