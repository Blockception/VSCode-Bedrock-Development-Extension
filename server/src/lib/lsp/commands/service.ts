import { Connection, WorkDoneProgressReporter } from "vscode-languageserver";
import { CancellationToken, ExecuteCommandParams, InitializeParams } from "vscode-languageserver-protocol";
import { IService } from "../services/service";
import { IExtendedLogger } from "../logger/logger";
import { CapabilityBuilder } from "../services/capabilities";
import { BaseService } from "../services/base";
import { ExtensionContext } from "../extension/context";
import { Context } from "../context/context";
import { CommandContext } from "./context";
import { CommandManager } from "./manager";

export class CommandService extends BaseService implements Partial<IService> {
  readonly name: string = "commands";
  private manager: CommandManager;

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[commands]"), extension);

    this.manager = CommandManager.load();
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    const commandsIds = new Array(...this.manager.commands()).filter(([id, v]) => v.private !== true).map(([id]) => id);

    capabilities.set("executeCommandProvider", {
      commands: commandsIds,
      workDoneProgress: true,
    });

    this.addDisposable(connection.onExecuteCommand(this.onCommandRequest.bind(this)));
  }

  private onCommandRequest(
    params: ExecuteCommandParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter
  ): any | Promise<any> {
    this.logger.debug("execute command request", params);
    const context: Context<CommandContext> = Context.create(
      this.extension,
      {
        token,
        workDoneProgress,
        ...params,
      },
      { logger: this.logger.withPrefix(`[${params.command}]`) }
    );

    return this.manager.execute(context);
  }
}
