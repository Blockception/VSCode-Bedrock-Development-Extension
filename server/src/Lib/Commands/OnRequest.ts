import { ExecuteCommandParams } from "vscode-languageserver";
import { Console } from "../Console/Console";
import { Commands } from "../Constants";
import { DiagnoseProjectCommand } from "./Diagnose Project";
import { Files } from "./Files";
import { McImportErrorsCommand } from "./Import Errors";
import { AddAllItems } from "./Language/AddAll";
import { CreateMCProject } from "./MCProjects";
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

      case Commands.ImportErrors:
        return McImportErrorsCommand(params);

      case Commands.DiagnoseProject:
        return DiagnoseProjectCommand(params);

      case Commands.AddLanguageFile:
        return AddAllItems(params);

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
    Console.Error(data);
  }

  return undefined;
}
