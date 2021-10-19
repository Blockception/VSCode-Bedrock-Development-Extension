import * as vscode from "vscode";
import { Glob } from "../Glob/Glob";
import { Manifest } from 'bc-minecraft-bedrock-project/lib/src/Lib/Internal/Types/Manifest';

export function RegisterTasks(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.tasks.registerTaskProvider("Minecraft Packaging", new PackingTaskProvider()));
}

class PackingTaskProvider implements vscode.TaskProvider {
  constructor() {}

  resolveTask(task: vscode.Task, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
    throw new Error("Method not implemented.");
  }

  provideTasks(token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
    const ws = vscode.workspace.workspaceFolders;

    if (ws === undefined) return undefined;

    const out : vscode.Task[] = [];

    ws.forEach((workspace) => {
      const manifests = Glob.GetFiles(["manifest.json", "**/manifest.json"], undefined, workspace.uri.fsPath, true);

      manifests.forEach(manifest=>{
        const type = 
      })
    });

    return out;
  }
}
