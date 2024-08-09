import { CancellationToken, CompletionParams, WorkDoneProgressReporter } from "vscode-languageserver";
import { TextDocument } from "../documents";
import { CompletionBuilder } from "./builder";
import { TextRange } from "../../minecraft/json/functions";
import { ParameterInfo, CommandInfo, Parameter, Command } from "bc-minecraft-bedrock-command";

export interface CompletionContext extends CompletionParams {
  document: TextDocument;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
  builder: CompletionBuilder;
  cursor: number;
}

export interface JsonCompletionContext extends CompletionContext {
  cursor: number;
  range: TextRange;
  currentText: string;
}

export interface CommandCompletionContext extends CompletionContext {
  parameter: ParameterInfo;
  parameterIndex: number;
  command: Command;
  bestMatch: CommandInfo;
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
}

export namespace JsonCompletionContext {
  export function getProperty(context: JsonCompletionContext): string | undefined {
    const text = context.document.getText();
    const before = text.slice(0, context.range.start);
    const index = before.lastIndexOf('":');
    if (index === -1) return undefined;

    //Find the start of the property
    const start = before.lastIndexOf('"', index - 1);
    if (start === -1) return undefined;

    return before.slice(start + 1, index);
  }
}
