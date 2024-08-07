import { CancellationToken, ExecuteCommandParams, WorkDoneProgressReporter } from "vscode-languageserver";
import { Context } from '../context/context';

export interface CommandContext extends ExecuteCommandParams {
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}

export interface ICommand {
  private?: boolean;
  execute(context: Context<CommandContext>): any | Promise<any>;
}
