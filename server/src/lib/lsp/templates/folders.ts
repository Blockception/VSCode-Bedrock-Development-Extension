import { Vscode } from "../../util";
import { Context } from "../context/context";
import { CommandContext } from "../commands/context";

export interface Folders {
  BehaviorPack(): string;
  ResourcePack(): string;
  WorkSpace(): string;
  WorldFolder(): string;
  GetFolder(command: string): string;
}

export interface EnsureFolders extends Folders {
  Ensure(): Folders;
}

export function getFolders(context: Context<CommandContext>): EnsureFolders {
  const args = context.arguments;
  if (args) {
    return new _internalContext(context, args[args.length - 1]);
  }

  return new _internalContext(context, undefined);
}

class _internalContext implements Folders {
  private _path: string | undefined;
  private ws: string | undefined;
  private bp: string | undefined;
  private rp: string | undefined;
  private wl: string | undefined;
  private context: Context<CommandContext>;

  constructor(context: Context<CommandContext>, path: string | undefined) {
    this.context = context;

    this.ws = "";
    const ws = context.database.WorkspaceData.getFirst();
    if (ws) this.ws = ws;

    if ((this._path = path)) {
      const ws = context.database.WorkspaceData.getFolder(path);
      if (ws) this.ws = ws;

      this.bp = context.database.ProjectData.behaviorPacks.get(path)?.folder;
      this.rp = context.database.ProjectData.resourcePacks.get(path)?.folder;
    }

    if (!this.bp) this.bp = context.database.ProjectData.behaviorPacks.packs[0]?.folder;
    if (!this.rp) this.rp = context.database.ProjectData.resourcePacks.packs[0]?.folder;
    if (!this.wl) this.wl = context.database.ProjectData.worlds.packs[0]?.folder;
  }

  BehaviorPack(): string {
    if (this.bp) return this.bp;

    const message = "This action requires behaviorpack with manifest to be present and findable for the plugin!";
    this.context.connection.window.showErrorMessage(message);
    throw new Error(message);
  }

  ResourcePack(): string {
    if (this.rp) return this.rp;

    const message = "This action requires resourcepack with manifest to be present and findable for the plugin!";
    this.context.connection.window.showErrorMessage(message);
    throw new Error(message);
  }

  WorkSpace(): string {
    if (this.ws) return this.ws;

    const message = "This action requires a workspace to be opened!";
    this.context.connection.window.showErrorMessage(message);
    throw new Error(message);
  }

  WorldFolder(): string {
    if (this.wl) return this.wl;

    const message = "This action requires world with manifest to be present and findable for the plugin!";
    this.context.connection.window.showErrorMessage(message);
    throw new Error(message);
  }

  GetFolder(command: string): string {
    if (command.includes("behavior-")) return this.BehaviorPack();
    if (command.includes("resource-")) return this.ResourcePack();
    if (command.includes("world-")) return this.WorldFolder();

    return this.WorkSpace();
  }

  Ensure(): Folders {
    const ensured = new _internalContext(this.context, this._path);
    const ws = this.WorkSpace();

    ensured.bp = this.bp || Vscode.join(ws, "behavior_packs", "unnamed_bp");
    ensured.rp = this.rp || Vscode.join(ws, "resource_packs", "unnamed_rp");
    ensured.wl = this.wl || Vscode.join(ws, "worlds", "unnamed_wl");

    return ensured;
  }
}
