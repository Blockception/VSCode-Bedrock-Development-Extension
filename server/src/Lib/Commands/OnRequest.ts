import { ExecuteCommandParams } from "vscode-languageserver";
import { Commands } from "../Constants";
import { DiagnoseProjectCommand } from "./Diagnose Project";
import { Files } from "./Files";
import { CreateMCProject } from "../Project/MCProjects";
import { ReScanProject } from "./Rescan";
import { Create } from "./Templates/Create";

/**
 *
 * @param params
 * @returns
 */
export function OnCommandRequestAsync(params: ExecuteCommandParams): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    resolve(OnCommandRequest(params));
  });
}

/**
 *
 * @param params
 * @returns
 */
function OnCommandRequest(params: ExecuteCommandParams): any {
  try {
    switch (params.command) {
      case Commands.Files.Append:
        return Files.Append(params);

      case Commands.DiagnoseProject:
        return DiagnoseProjectCommand(params);

      //case Commands.AddLanguageFile:
      //return AddAllItems(params);

      case Commands.MCProject.Create:
        return CreateMCProject();

      case Commands.ScanProjects:
        return ReScanProject();

      default:
        if (params.command.startsWith(Commands.Create.Base)) {
          return Create(params);
        }
    }
  } catch (error) {
    const data = JSON.stringify(error);
    console.error(data);
  }

  return undefined;
}
