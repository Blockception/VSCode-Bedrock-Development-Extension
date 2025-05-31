import {
  commands,
  ExtensionContext,
  FileType,
  ProgressLocation,
  QuickPick,
  QuickPickItem,
  TextEditor,
  Uri,
  window,
  workspace,
} from "vscode";
import { Commands } from "@blockception/shared";
import { GithubFiles } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Vanilla/sources";
import fetch, { RequestInit } from "node-fetch";
import path from "path";
import { getIdByLocalizationID } from "./LocalizationIDs";

export function Activate(context: ExtensionContext): void {
  async function FillIdByName(args: any) {
    const base = context.storageUri || context.globalStorageUri;
    const storage_path = path.join(base.fsPath, "vanilla");
    const command = new FillIdByNameCommand(storage_path);

    return command.process("resource_pack/texts/en_US.lang", GithubFiles.source);
  }

  context.subscriptions.push(commands.registerCommand(Commands.FillIdByName, FillIdByName));
}

const day_diff_2 = 1000 * 60 * 60 * 24 * 2;

class FillIdByNameCommand {
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
    const editor = window.activeTextEditor;
    if (!editor) {
      return;
    }

    const filepath = this.getFilepath(key);
    const uri = source + key;

    const dir = path.dirname(filepath);

    await workspace.fs.createDirectory(Uri.file(dir));

    // Check if already exists and download if not
    const canRead = await this.canRead(filepath);
    if (!canRead) {
      await this.download(uri, filepath);
    }

    // Load contents
    let contents: string;
    try {
      contents = new TextDecoder("utf-8").decode(await workspace.fs.readFile(Uri.file(filepath)));
    } catch (err) {
      window.showErrorMessage("Failed to read vanilla file", filepath);
      return;
    }

    // Parse contents
    const lines = contents
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => {
        return line.length > 0 && !line.startsWith("#") && (line.startsWith("item.") || line.startsWith("tile."));
      });
    const items = new Map<string, string>();

    for (const line of lines) {
      const parts = line.split("=", 2);
      const id = parts[0];
      const name = parts[1].split("#")[0].trim();

      items.set(name, id);
    }

    const keys = Array.from(items.keys());

    const prefill = editor.document.getText(editor.selection);

    await this.quickPickWithPrefill(keys, prefill).then((picked) => {
      if (!picked) {
        return;
      }

      const localizationId = items.get(picked);
      if (!localizationId) {
        return;
      }

      const id = getIdByLocalizationID(localizationId);
      if (!id) {
        return;
      }

      editor.edit((editBuilder) => {
        const selection = editor.selection;
        if (selection.isEmpty) {
          // No selection: insert at cursor position
          editBuilder.insert(selection.start, id);
        } else {
          // Replace the selected text
          editBuilder.replace(selection, id);
        }
      });
    });
  }
  quickPickWithPrefill(items: string[], prefill: string): Promise<string | undefined> {
    const qp = window.createQuickPick<QuickPickItem>();
    qp.items = items.map((label) => ({ label }));
    qp.value = prefill;
    qp.placeholder = "Start typing or pick an item...";

    return new Promise((resolve) => {
      qp.onDidAccept(() => {
        const picked = qp.selectedItems.length > 0 ? qp.selectedItems[0].label : undefined;
        qp.hide();
        resolve(picked);
      });

      qp.onDidHide(() => qp.dispose());
      qp.show();
    });
  }
}
