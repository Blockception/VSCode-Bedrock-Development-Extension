import { Context } from "../../context/context";
import { EnsureFolders, getFolders } from "../../templates/folders";
import { CommandContext } from "../context";
import { getTemplateCommand } from "./templates";

export type CreateFn = (context: Context<CommandContext>, folders: EnsureFolders) => Promise<boolean | void>;

/**Executes the given creation command */
export function createCommand(callback: CreateFn) {
  return async function (context: Context<CommandContext>) {
    const folders = getFolders(context);

    return callback(context, folders).then(() => {});
  };
}

export function mustExecute(
  commandId: string,
  context: Context<CommandContext>,
  folder?: string | undefined,
  attributes: Record<string, string> = {}
) {
  const t = getTemplateCommand(commandId);
  if (t === undefined) throw new Error("couldn't find template command: " + commandId);

  return t.execute(context, folder, attributes);
}
