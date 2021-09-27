import { Command, Parameter } from "bc-minecraft-bedrock-command";
import { CommandInfo, ParameterInfo } from "bc-minecraft-bedrock-command/lib/src/Lib/Data/CommandInfo";
import { SimpleContext } from "../Code/SimpleContext";
import { IsEducationEnabled } from "../Project/Attributes";
import { TextDocument } from "../Types/Document/TextDocument";
import { CompletionBuilder } from "./include";

/**
 *
 */
export interface CommandCompletionContext extends SimpleContext<CompletionBuilder> {
  /** */
  parameter: ParameterInfo;
  /** */
  parameterIndex: number;
  /** */
  command: Command;
  /** */
  bestMatch: CommandInfo;
  /** */
  cursor: number;
  /** */
  current: Parameter | undefined;
}

/**
 *
 */
export namespace CommandCompletionContext {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is CommandCompletionContext {
    if (value) {
      let temp = value as CommandCompletionContext;

      if (temp.parameter && temp.command && temp.cursor && temp.receiver) return true;
    }

    return false;
  }

  /**
   *
   * @param Parameter
   * @param Command
   * @param cursor
   * @param receiver
   * @param Current
   * @returns
   */
  export function create(
    parameter: ParameterInfo,
    parameterIndex: number,
    command: Command,
    cursor: number,
    receiver: CompletionBuilder,
    current: Parameter | undefined = undefined,
    doc: TextDocument
  ): CommandCompletionContext {
    const BestMatch = command.getCommandData(IsEducationEnabled(doc))[0];

    return {
      parameter: parameter,
      parameterIndex: parameterIndex,
      command: command,
      bestMatch: BestMatch,
      cursor: cursor,
      receiver: receiver,
      current: current,
      doc: doc,
    };
  }
}
