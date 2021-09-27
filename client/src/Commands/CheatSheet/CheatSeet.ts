import { commands, ExtensionContext, Uri, ViewColumn, window } from "vscode";
import * as path from "path";
import { readFileSync } from "fs";
import { Commands } from "../../Constants";

export function Activate(context: ExtensionContext): void {
  console.log("registering cheat sheets");

  context.subscriptions.push(
    commands.registerCommand(Commands.CheatSheet.Molang, (args) => createView(context, "Molang cheat sheet", "documentation/cheat-sheet/Molang.html")),
    commands.registerCommand(Commands.CheatSheet.BehaviorFilters, (args) => createView(context, "Molang cheat sheet", "documentation/cheat-sheet/Behavior filters.html"))
  );
}

function createView(context: ExtensionContext, title: string, uri: string): void {
  const panel = window.createWebviewPanel("cheat-sheet", title, ViewColumn.One, {});
  const Path = Uri.file(path.join(context.extensionPath, uri));

  const Data = readFileSync(Path.fsPath, "utf-8");
  panel.webview.html = Data;
}
