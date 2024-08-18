import { commands, ExtensionContext, FileType, ProgressLocation, Uri, window, workspace } from "vscode";
import { Commands } from "@blockception/shared";
import { GithubFiles } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Vanilla/sources";
import path from "path";

export function activate(context: ExtensionContext): void {
  async function showVanillaFile() {
    const base = context.storageUri || context.globalStorageUri;
    const storage_path = path.join(base.fsPath, "vanilla");
    const command = new ShowVanillaFileCommand(storage_path);

    const source = GithubFiles.source;
    const files = GithubFiles.files;

    if (files.length === 0) {
      return;
    }

    return window.showQuickPick(files).then((filepath) => {
      if (!filepath) {
        return;
      }

      return command.process(filepath, source);
    });
  }

  context.subscriptions.push(commands.registerCommand(Commands.ShowVanillaFile, showVanillaFile));
}

const day_diff_2 = 1000 * 60 * 60 * 24 * 2;

class ShowVanillaFileCommand {
  private storage: string;

  constructor(storage: string) {
    this.storage = storage;
  }

  getFilepath(key: string): string {
    return path.join(this.storage, key);
  }

  async canRead(filepath: string): Promise<boolean> {
    try {
      const stat = await workspace.fs.stat(Uri.file(filepath));

      if (stat.type !== FileType.File) return false;

      //Check if the file is not older then 2 days
      const now = new Date();
      const file = new Date(stat.mtime);

      const diff = now.getTime() - file.getTime();

      return diff <= day_diff_2;
    } catch (err) {
      console.log("trouble during checking of file", err);
      return false;
    }
  }

  async download(uri: string, filepath: string): Promise<void> {
    const progressOptions = {
      location: ProgressLocation.Notification,
      title: "Downloading vanilla file",
      cancellable: false,
    };

    return window.withProgress(progressOptions, async (progress) => {
      const options: RequestInit = {
        method: "GET",
        redirect: "error",
      };

      progress.report({
        message: "Downloading vanilla file",
        increment: 0,
      });

      await fetch(uri, options)
        .then((data) => data.text())
        .then((text) => {
          return workspace.fs.writeFile(Uri.file(filepath), Buffer.from(text, "utf8"));
        })
        .catch((err) => {
          window.showErrorMessage(
            "Failed to download vanilla file\n",
            uri + "\n",
            filepath + "\n",
            JSON.stringify(err)
          );
        })
        .finally(() => {
          console.log("Downloaded vanilla file", filepath);
        });

      progress.report({ increment: 100 });
    });
  }

  async process(key: string, source: string): Promise<void> {
    const filepath = this.getFilepath(key);
    const uri = source + key;

    const dir = path.dirname(filepath);

    await workspace.fs.createDirectory(Uri.file(dir));

    const canRead = await this.canRead(filepath);
    if (!canRead) {
      await this.download(uri, filepath);
    }

    try {
      const doc = await workspace.openTextDocument(Uri.file(filepath));
      await window.showTextDocument(doc);
    } catch (err) {
      window.showErrorMessage("Failed to open vanilla file", filepath, JSON.stringify(err));
    }
  }
}
