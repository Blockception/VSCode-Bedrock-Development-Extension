import { MCProject } from "bc-minecraft-project";
import { Context } from "../../context/context";
import { CommandContext } from "../context";
import { getWorkspace } from "../util";
import { getProject } from "../../../project/mcprojects";
import { Fs } from "../../../util/url";

export async function createMcProject(context: Context<CommandContext>) {
  const workspaceProcessor = getWorkspace(context);
  const ws = await workspaceProcessor.get();
  if (ws === null) {
    throw new Error("trouble loading the workspaces");
  }

  for (let I = 0; I < ws.length; I++) {
    const folder = ws[I].uri;
    const p = getProject(folder, context.settings);

    MCProject.saveSync(Fs.FromVscode(folder), p);
  }
}
