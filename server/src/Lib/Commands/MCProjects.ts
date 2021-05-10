import { MCAttributes, MCDefinition, MCIgnore } from "bc-minecraft-project";
import path from "path";
import { URI } from "vscode-uri";
import { Manager } from "../Manager/include";
import { TemplateBuilder } from "./Templates/include";

export function CreateMCProject() {
  Manager.Connection.workspace.getWorkspaceFolders().then((ws) => {
    if (ws === null) return;

    let builder = new TemplateBuilder();

    for (let I = 0; I < ws.length; I++) {
      const folder = URI.parse(ws[I].uri).fsPath;

      builder.CreateFile(path.join(folder, MCAttributes.filename), "");
      builder.CreateFile(path.join(folder, MCDefinition.filename), "");
      builder.CreateFile(path.join(folder, MCIgnore.filename), "");
    }

    builder.Send();
  });
}
