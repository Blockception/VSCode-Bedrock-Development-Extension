import { CommandContext } from "../context";
import { Context } from "../../context/context";
import { getWorkspace } from "../util";

/**
 * @see {Commands.DiagnoseProject}
 * @param context
 * @returns
 */
export function diagnoseProject(context: Context<CommandContext>) {
  const workspaceProcessor = getWorkspace(context);

  return workspaceProcessor.start();
}

/**
 * @see {Commands.ScanProjects}
 */
export function rescanProject(context: Context<CommandContext>) {
  const workspaceProcessor = getWorkspace(context);
  context.database.clear();

  return workspaceProcessor.start();
}
