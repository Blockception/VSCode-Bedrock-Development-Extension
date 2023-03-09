import { commands, ExtensionContext, Uri, window, workspace } from "vscode";
import { Commands } from "@blockception/shared";
import { GithubFiles } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Vanilla/sources";
import fetch, { RequestInit } from "node-fetch";

export function Activate(context: ExtensionContext): void {
  async function ShowVanillaFile(args: any) {
    const source = GithubFiles.source;
    const files = GithubFiles.files;

    if (files.length === 0) {
      return;
    }

    window.showQuickPick(files).then((filepath) => {
      if (!filepath) {
        return;
      }

      const uri = Uri.parse(source + filepath);
      const options: RequestInit = {
        method: "GET",
        redirect: "error",
      };

      console.log("Downloading vanilla file", filepath)
      return fetch(uri.toString(), options)
        .then(data => data.text())
        .then(text => {
          workspace.openTextDocument({ language: "json", content: text }).then(doc => window.showTextDocument(doc))
        })        
        .catch(err => {
          window.showErrorMessage("Failed to download vanilla file", filepath as string, JSON.stringify(err));
        }).finally(() => {
          console.log("Downloaded vanilla file", filepath)
        });

    });
  }

  context.subscriptions.push(commands.registerCommand(Commands.ShowVanillaFile, ShowVanillaFile));
}
