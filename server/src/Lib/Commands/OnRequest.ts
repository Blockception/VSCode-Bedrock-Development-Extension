import { ExecuteCommandParams } from "vscode-languageserver";
import { Console } from "../Console/Console";
import { Commands } from "../Constants";
import { DiagnoseProjectCommand } from "./Diagnose Project";
import { McImportErrorsCommand } from "./Import Errors";
import { AddAllItems } from "./Language/AddAll";
import { CreateMCProject } from "./MCProjects";
import { Create } from "./Templates/Create";

export function OnCommandRequestAsync(params: ExecuteCommandParams): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    resolve(OnCommandRequest(params));
  });
}

function OnCommandRequest(params: ExecuteCommandParams): any {
  try {
    switch (params.command) {
      case Commands.ImportErrors:
        return McImportErrorsCommand(params);

      case Commands.DiagnoseProject:
        return DiagnoseProjectCommand(params);

      case Commands.AddLanguageFile:
        return AddAllItems(params);

      case Commands.MCProject.Create:
        return CreateMCProject();

      default:
        if (params.command.startsWith(Commands.Create.Base)) {
          return Create(params);
        }
    }
  } catch (error) {
    Console.Error(JSON.stringify(error));
  }

  return undefined;
}
