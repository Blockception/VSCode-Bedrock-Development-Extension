import { AddAllItems } from "./Language";
import { Commands } from "@blockception/shared";
import { Console } from "../Manager";
import { Create } from "./Templates/Create";
import { DiagnoseProjectCommand } from "./Diagnose Project";
import { ExecuteCommandParams } from "vscode-languageserver";
import { Files } from "./Files";
import { HandleError } from "../Code/Error";
import { ReScanProject } from "./Rescan";
import { StoreProject } from "./StoreProject";
import { Workspace } from "../workspace/workspace";

/**
 *
 * @param params
 * @returns
 */
export function OnCommandRequestAsync(params: ExecuteCommandParams): Promise<any> {
  return Console.request(`Command Execution [${params.command}]`, Promise.resolve(OnCommandRequest(params)));
}

/**
 *
 * @param params
 * @returns
 */
function OnCommandRequest(params: ExecuteCommandParams): any {
  let out = undefined;
  try {
    out = InternalCommandRequest(params);
  } catch (error) {
    HandleError(error);
  }

  return out;
}

function InternalCommandRequest(params: ExecuteCommandParams): any {
  if (params.command.startsWith(Commands.Create.Base)) {
    return Create(params);
  }

  switch (params.command) {
    case Commands.Files.Append:
      return Files.Append(params);

    case Commands.DiagnoseProject:
      return DiagnoseProjectCommand(params);

    case Commands.AddLanguageFile:
      return AddAllItems(params);

    case Commands.MCProject.Create:
      return Workspace.CreateMCProject();

    case Commands.ScanProjects:
      return ReScanProject();

    case Commands.StoreProject:
      return StoreProject();
  }
}
