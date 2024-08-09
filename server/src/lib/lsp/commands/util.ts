import { Context } from "../context/context";
import { WorkspaceProcessor } from "../process/workspace-processor";
import { CommandContext } from "./context";

export function getWorkspace(context: Context<CommandContext>) {
  const workspaceProcessor = context.services.service(WorkspaceProcessor);

  if (workspaceProcessor === undefined) {
    throw new Error("cannot find the workspace processor");
  }

  return workspaceProcessor;
}
