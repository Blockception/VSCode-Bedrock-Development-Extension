import { Pack } from "bc-minecraft-bedrock-project";
import { ExecuteCommandParams } from "vscode-languageserver";
import { ProvidePackDiagnostics } from "../Diagnostics/OnRequest";
import { Console } from "../Manager/Console";
import { Traverse } from "../Process/Traverse";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  Console.Log("Starting on diagnosing project");

  Traverse().then((packs) => packs.forEach(ProvidePackDiagnostics));
}
