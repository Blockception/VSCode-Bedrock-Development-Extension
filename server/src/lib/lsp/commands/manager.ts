import { Commands } from "@blockception/shared";
import { Context } from "../context/context";
import { diagnoseProject, rescanProject } from "./commands/diagnose-project";
import { appendToFile } from "./commands/files";
import { addAllItems } from "./commands/language";
import { createMcProject } from "./commands/mcproject";
import { storeProject } from "./commands/store-project";
import { setupTemplates } from "./commands/templates";
import { setupCreate } from "./commands/templates-specalized";
import { CommandContext, ICommand } from "./context";

import assert from "assert";

export class CommandManager implements ICommand {
  private _commands: Map<string, ICommand>;

  constructor() {
    this._commands = new Map<string, ICommand>();
  }

  commands() {
    return this._commands.entries();
  }

  /**
   * Adds a new command to the service handler
   * @param id The command identifcation vscode uses
   * @param callback The function to call or the ICommand object to use
   * @param register Whenever or not the function must be registered on server side
   * @returns this
   */
  add(id: string, callback: ICommand | ICommand["execute"], register?: boolean): this {
    assert(this._commands.has(id) === false, `command with ${id} already exists`);

    if (typeof callback === "function") {
      callback = {
        execute: callback,
        register
      };
    }
    if (typeof register === "boolean") {
      callback.register = register;
    }

    this._commands.set(id, callback);

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
          context.arguments,
          undefined,
          2
        )}. error: ${JSON.stringify(error, undefined, 2)}`
      );
    } finally {
      context.workDoneProgress.done();
    }
  }

  static load(): CommandManager {
    const manager = new CommandManager();

    manager
      .add(Commands.DiagnoseProject, diagnoseProject, true)
      .add(Commands.AddLanguageFile, addAllItems)
      .add(Commands.ScanProjects, rescanProject, true)
      .add(Commands.StoreProject, storeProject, true)
      .add(Commands.Files.Append, appendToFile, true)
      .add(Commands.MCProject.Create, createMcProject);

    setupCreate(manager);
    setupTemplates(manager);

    return manager;
  }
}
