import { ExecuteCommandParams } from "vscode-languageserver";
import { Commands } from "../Constants";
import { DiagnoseProjectCommand } from "./Diagnose Project";
import { Files } from "./Files";
import { ReScanProject } from "./Rescan";
import { Create } from "./Templates/Create";
import { HandleError } from "../Code/Error";
import { StoreProject } from "./StoreProject";
import { AddAllItems } from "./Language/index";
import { Workspace } from '../Workspace/Workspace';

/**
 *
 * @param params
 * @returns
 */
export function OnCommandRequestAsync(params: ExecuteCommandParams): Promise<any> {
return Promise.resolve(OnCommandRequest(params));
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

    default:
      if (params.command.startsWith(Commands.Create.Base)) {
        return Create(params);
      }
  }
}
