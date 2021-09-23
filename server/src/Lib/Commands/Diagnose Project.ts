import { ExecuteCommandParams } from "vscode-languageserver";
import { Console } from "../Manager/Console";
import { Traverse } from "../Process/Traverse";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  Console.Log("Starting on diagnosing project");

  Traverse();
}
