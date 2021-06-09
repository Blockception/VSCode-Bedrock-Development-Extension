import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import path from "path";
import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { Manager } from "../Manager/include";
import { TemplateBuilder } from "./Templates/include";

export function CreateMCProject() {
  Manager.Connection.workspace.getWorkspaceFolders().then(processWorkspace);
}

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
