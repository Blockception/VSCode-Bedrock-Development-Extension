import { commands, ExtensionContext, FileType, ProgressLocation, Uri, window, workspace } from "vscode";
import { Commands } from "@blockception/shared";
import { Console } from "../console/console";

import path from "path";

export function activate(context: ExtensionContext): void {
  async function showDocs() {
    const base = context.storageUri || context.globalStorageUri;
    const storage_path = path.join(base.fsPath, "docs");
    const command = new ShowDocsCommand(storage_path);

    const sidebar = await command.getSidebar();

    if (sidebar.length === 0) {
      return;
    }
    // Processed titles are made from the toc_title and the parent toc_title
    const titles: string[] = sidebar.map((x) => x.processedTitle ?? x.toc_title);

    return window.showQuickPick(titles).then((title) => {
      if (!title) {
        return;
      }

      // Find the item by title or processed title
      const item = sidebar.find((x) => x.processedTitle === title || x.toc_title === title);
      if (!item) {
        Console.errror("Failed to find docs item", title);
        return;
      }

      return command.process(item);
    });
  }

  context.subscriptions.push(commands.registerCommand(Commands.ShowDocs, showDocs));
}

const day_diff_2 = 1000 * 60 * 60 * 24 * 2;
// URL with the list of all docs
const sidebar_url = "https://learn.microsoft.com/en-us/minecraft/creator/toc.json";
// URL to the docs, that will be prepended to the href
const html_url = "https://learn.microsoft.com/en-us/minecraft/creator/";

/**
 * Represents a command to show documentation.
 */
class ShowDocsCommand {
  private storage: string;
  // Cached flattened sidebar
  private sidebar: SidebarItem[];

  /**
   * Creates a new instance of the ShowDocsCommand class.
   * @param storage The storage path.
   */
  constructor(storage: string) {
    this.storage = storage;
    this.sidebar = [];
  }

  /**
   * Gets the flattened sidebar.
   * @returns A promise that resolves to the flattened sidebar. or an empty array if the sidebar could not be downloaded.
   */
  async getSidebar(): Promise<SidebarItem[]> {
    if (this.sidebar.length > 0) {
      return this.sidebar;
    }
    const data = await fetch(sidebar_url);

    if (!data.ok) {
      window.showErrorMessage("Failed to download docs sidebar");
      return this.sidebar;
    }

    const jsonData = (await data.json()) as Sidebar;

    if (!Sidebar.is(jsonData)) {
      window.showErrorMessage("Failed to parse docs sidebar");
      return this.sidebar;
    }

    return (this.sidebar = this.flattenSidebar(jsonData.items));
  }

  /**
   * Flattens the sidebar from a tree to a list omitting all elements without href.
   * It also adds the processed title to each element.
   * @param sidebar The sidebar to flatten
   * @param prefix The prefix to add to the processed title
   * @returns The flattened sidebar
   */
  flattenSidebar(sidebar: SidebarItem[], prefix: string = ""): SidebarItem[] {
    const result: SidebarItem[] = [];

    for (let I = 0; I < sidebar.length; I++) {
      const item = sidebar[I];
      // Add the prefix to the title
      // Remove the docs title from the path, because it is too long
      item.processedTitle = `${prefix}/${item.toc_title}`.replace("/Minecraft: Bedrock Documentation/", "");
      if (item.href) {
        result.push(item);
      }

      if (item.children) {
        // Iterative approach would be better, but recursion is easier
        result.push(...this.flattenSidebar(item.children, item.processedTitle));
      }
    }

    return result;
  }

  /**
   * Gets the filepath for the specified sidebar item.
   * @param item The sidebar item.
   * @returns The filepath for the specified sidebar item.
   */
  getFilepath(item: SidebarItem): string {
    // At this point, elements without href are filtered out
    return path.join(this.storage, item.href! + ".md");
  }

  /**
   * Checks if the specified file can be read.
   * @param filepath The filepath of the file to check.
   * @returns A promise that resolves to true if the file can be read, false otherwise.
   */
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
      Console.errror(`Failed to read file ${filepath}`, err);
    }

    return false;
  }

  /**
   * Downloads the specified URI to the specified filepath.
   * @param uri The URI to download.
   * @param filepath The filepath to download to.
   * @returns A promise that resolves when the download is complete.
   */
  async download(uri: string, filepath: string): Promise<void> {
    const progressOptions = {
      location: ProgressLocation.Notification,
      title: "Downloading docs",
      cancellable: false,
    };

    return window.withProgress(progressOptions, async (progress) => {
      const options: RequestInit = {
        method: "GET",
      };

      progress.report({
        message: "Downloading docs",
        increment: 0,
      });

      try {
        // Download the html page
        const result = await fetch(uri, options);

        if (!result.ok) {
          window.showErrorMessage("Failed to download docs\n", `${uri}\n${filepath}\n`, result.statusText);
          return;
        }

        const text = await result.text();

        progress.report({ increment: 50 });
        // Find the github link and change blob to raw. It's not the best solution, but it works
        const matches = /(https:\/\/github.com\/MicrosoftDocs\/minecraft-creator\/blob\/main\/[^"]+)/g.exec(text);
        if (!matches || matches.length === 0 || matches[0] === undefined) {
          window.showErrorMessage("Failed to download docs\n", `${uri}\n${filepath}\nNo github link found`);
          return;
        }
        const mdUrl = matches[0].replace(
          "MicrosoftDocs/minecraft-creator/blob/",
          "MicrosoftDocs/minecraft-creator/raw/"
        );
        // Download the markdown file
        const mdResult = await fetch(mdUrl, options);

        if (!mdResult.ok) {
          window.showErrorMessage("Failed to download docs\n", `${uri}\n${filepath}\n`, mdResult.statusText);
          return;
        }

        const mdText = await mdResult.text();

        await workspace.fs.writeFile(Uri.file(filepath), Buffer.from(mdText, "utf8"));
        Console.info("Downloaded docs", filepath);
      } catch (err) {
        window.showErrorMessage("Failed to download docs\n", `${uri}\n${filepath}\n`, JSON.stringify(err));
      }

      progress.report({ increment: 50 });
    });
  }

  /**
   * Processes the specified sidebar item.
   * @param item The sidebar item to process.
   * @returns A promise that resolves when the processing is complete.
   */
  async process(item: SidebarItem): Promise<void> {
    const filepath = this.getFilepath(item);
    const dir = path.dirname(filepath);

    await workspace.fs.createDirectory(Uri.file(dir));

    const canRead = await this.canRead(filepath);
    if (!canRead) {
      const html_uri = html_url + item.href!;
      await this.download(html_uri, filepath);
    }

    try {
      const uri = Uri.file(filepath);
      // Open the markdown preview
      await commands.executeCommand("markdown.showPreview", uri);
    } catch (err) {
      window.showErrorMessage("Failed to open docs", filepath, JSON.stringify(err));
    }
  }
}

// Interfaces for the sidebar. It's not complete, but it's enough for this use case
interface Sidebar {
  items: SidebarItem[];
}

interface SidebarItem {
  href?: string;
  toc_title: string;
  children?: SidebarItem[];
  // This is added by the flattenSidebar function
  processedTitle?: string;
}

namespace Sidebar {
  export function is(item: any): item is Sidebar {
    return item && item.items && Array.isArray(item.items);
  }
}
