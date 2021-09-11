import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import path from "path";
import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { TemplateBuilder } from "../Commands/Templates/include";
import { Manager } from "../Manager/Manager";

/**
 *
 */
export function CreateMCProject() {
  Manager.Connection.workspace.getWorkspaceFolders().then(processWorkspace);
}

/**
 *
 * @param ws
 * @returns
 */
function processWorkspace(ws: WorkspaceFolder[] | null): void {
  if (ws === null) return;

  const builder = new TemplateBuilder();

  for (let I = 0; I < ws.length; I++) {
    const folder = URI.parse(ws[I].uri).fsPath;

    builder.CreateFile(path.join(folder, MCAttributes.filename), "");
    builder.CreateFile(path.join(folder, MCDefinition.filename), "");
    builder.CreateFile(path.join(folder, MCIgnore.filename), "");
  }

  builder.Send();
}
