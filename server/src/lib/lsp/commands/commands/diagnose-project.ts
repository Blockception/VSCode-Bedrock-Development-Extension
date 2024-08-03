import { ExecuteCommandParams } from "vscode-languageserver";


export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  Console.Log("Starting on diagnosing project");

  Traverse();
}
