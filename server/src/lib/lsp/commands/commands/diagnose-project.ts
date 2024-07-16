import { ExecuteCommandParams } from "vscode-languageserver";
import { Console } from "../../../manager/console";
import { Traverse } from "../../process/traverse";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  Console.Log("Starting on diagnosing project");

  Traverse();
}
