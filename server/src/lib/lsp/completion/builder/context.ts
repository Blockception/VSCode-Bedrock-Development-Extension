import { Command, CommandInfo, Parameter, ParameterInfo } from "bc-minecraft-bedrock-command";
import { SimpleContext } from "../../../util/simple-context";
import { TextRange } from "../../../minecraft/json/functions";
import { IsEducationEnabled } from "../../../project/attributes";
import { TextDocument } from "../../documents/text-document";
import { CompletionBuilder } from "./builder";
import { CompletionContext } from "vscode-languageserver-protocol";
import { IExtendedLogger } from "../../logger/logger";
import { ProjectData } from "bc-minecraft-bedrock-project";

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

      if (temp.parameter && temp.command && temp.cursor && temp.builder) return true;
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
    builder: CompletionBuilder,
    current: Parameter | undefined = undefined,
    doc: TextDocument,
    logger: IExtendedLogger,
    projectData: ProjectData
  ): CommandCompletionContext {
    const bestMatch = command.getCommandData(IsEducationEnabled(doc))[0];

    return {
      parameter,
      parameterIndex,
      command,
      bestMatch,
      cursor,
      builder,
      current,
      doc,
      logger,
      projectData,
    };
  }
}

export interface JsonCompletionContext extends SimpleContext<CompletionBuilder> {
  cursor: number;
  range: TextRange;
  currentText: string;
}

export namespace JsonCompletionContext {
  export function getProperty(context: JsonCompletionContext): string | undefined {
    const text = context.doc.getText();
    const before = text.slice(0, context.range.start);
    const index = before.lastIndexOf('":');
    if (index === -1) return undefined;

    //Find the start of the property
    const start = before.lastIndexOf('"', index - 1);
    if (start === -1) return undefined;

    return before.slice(start + 1, index);
  }
}
