import { commands, ExtensionContext, FileType, ProgressLocation, Uri, window, workspace } from "vscode";
import { Commands } from "@blockception/shared";
import fetch, { RequestInit } from "node-fetch";
import path from "path";

export function Activate(context: ExtensionContext): void {
  async function ShowDocs(args: any) {
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
      return command.process(sidebar.find((x) => x.processedTitle === title || x.toc_title === title));
    });
  }

  context.subscriptions.push(commands.registerCommand(Commands.ShowDocs, ShowDocs));
}

const day_diff_2 = 1000 * 60 * 60 * 24 * 2;
// URL with the list of all docs
const sidebar_url = "https://learn.microsoft.com/en-us/minecraft/creator/toc.json";
// URL to the docs, that will be prepended to the href
const html_url = "https://learn.microsoft.com/en-us/minecraft/creator/";
// Cached flattened sidebar
let sidebar: SidebarItem[] | undefined;

class ShowDocsCommand {
  private storage: string;

  constructor(storage: string) {
    this.storage = storage;
  }

  async getSidebar(): Promise<SidebarItem[]> {
    if (sidebar) {
      return Promise.resolve(sidebar);
    }
    const data = await fetch(sidebar_url);
    const jsonData = (await data.json()) as Sidebar;
    sidebar = this.flattenSidebar(jsonData.items);
    return sidebar;
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
      item.processedTitle = (prefix + "/" + item.toc_title).replace("/Minecraft: Bedrock Documentation/", "");
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

  getFilepath(item: SidebarItem): string {
    // At this point, elements without href are filtered out
    return path.join(this.storage, item.href! + ".md");
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
        const text = await result.text();

        progress.report({ increment: 50 });
        // Find the github link and change blob to raw. It's not the best solution, but it works
        const matches = /(https:\/\/github.com\/MicrosoftDocs\/minecraft-creator\/blob\/main\/[^"]+)/g.exec(text);
        if (!matches || matches.length === 0 || !matches[0]) {
          window.showErrorMessage("Failed to download docs\n", uri + "\n", filepath + "\nNo github link found");
          return;
        }
        const mdUrl = matches[0].replace(
          "MicrosoftDocs/minecraft-creator/blob/",
          "MicrosoftDocs/minecraft-creator/raw/"
        );
        // Download the markdown file
        const mdResult = await fetch(mdUrl, options);
        const mdText = await mdResult.text();

        await workspace.fs.writeFile(Uri.file(filepath), Buffer.from(mdText, "utf8"));
      } catch (err) {
        window.showErrorMessage("Failed to download docs\n", uri + "\n", filepath + "\n", JSON.stringify(err));
      }
      console.log("Downloaded docs", filepath);

      progress.report({ increment: 50 });
    });
  }

  async process(item: SidebarItem | undefined): Promise<void> {
    if (!item) {
      return;
    }
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
      window.showErrorMessage("Failed to open docs", filepath);
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
