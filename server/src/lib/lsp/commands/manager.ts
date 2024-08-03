import { Commands } from "@blockception/shared";
import { Context } from "../context/context";
import { CommandContext, ICommand } from "./context";
import { diagnoseProject, rescanProject } from "./commands/diagnose-project";
import { addAllItems } from "./commands/language";
import { storeProject } from "./commands/store-project";
import { appendToFile } from "./commands/files";
import { setupCreate } from "./templates/create";
import { setupTemplates } from "./templates/templates";

import assert from "assert";

export class CommandManager implements ICommand {
  private _commands: Map<string, ICommand>;

  constructor() {
    this._commands = new Map<string, ICommand>();
  }

  commands() {
    return this._commands.keys();
  }

  add(id: string, callback: ICommand["execute"]): this {
    assert(this._commands.has(id) === false, `command with ${id} already exists`);

    this._commands.set(id, {
      execute: callback,
    });

    return this;
  }

  execute(context: Context<CommandContext>): any | Promise<any> {
    const com = this._commands.get(context.command);
    if (com === undefined) {
      context.logger.debug("unknown command");
      return;
    }

    context.workDoneProgress.begin(context.command, 0, "executing...", true);
    try {
      return com.execute(context);
    } catch (error) {
      context.logger.recordError(error);

      context.connection.window.showErrorMessage(
        `couldn't execute command: ${context.command} with ${JSON.stringify(
          context.args,
          undefined,
          2
        )}. error: ${JSON.stringify(error, undefined, 2)}`
      );
    } finally {
      context.workDoneProgress.done();
    }
  }

  executeCommand(command: string, context: Context<CommandContext>) {
    context = Context.modify(context, {
      command: command,
    });
  }

  static load(): CommandManager {
    const manager = new CommandManager();

    manager
      .add(Commands.DiagnoseProject, diagnoseProject)
      .add(Commands.AddLanguageFile, addAllItems)
      .add(Commands.ScanProjects, rescanProject)
      .add(Commands.StoreProject, storeProject)
      .add(Commands.Files.Append, appendToFile)
      .add(Commands.MCProject.Create, Workspace.CreateMCProject);

    setupCreate(manager);
    setupTemplates(manager);

    return manager;
  }
}
