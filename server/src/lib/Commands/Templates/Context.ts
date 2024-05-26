import { ExecuteCommandParams } from "vscode-languageserver";
import { Database } from "../../Database/Database";
import { Manager } from "../../Manager/Manager";
import { Vscode } from '../../Code';

export interface Context {
  BehaviorPack(): string;
  ResourcePack(): string;
  WorkSpace(): string;
  WorldFolder(): string;
  GetFolder(command: string): string;
}

export interface EnsureContext extends Context {
  Ensure(): Context;
}

export function GetContext(params: ExecuteCommandParams): EnsureContext {
  const args = params.arguments;

  if (args) {
    return new _internalContext(args[args.length - 1]);
  }

  return new _internalContext(undefined);
}

class _internalContext implements Context {
  private _path: string | undefined;
  private ws: string | undefined;
  private bp: string | undefined;
  private rp: string | undefined;
  private wl: string | undefined;

  constructor(path: string | undefined) {
    this.ws = "";
    const ws = Database.WorkspaceData.getFirst();
    if (ws) this.ws = ws;

    if ((this._path = path)) {
      const ws = Database.WorkspaceData.getFolder(path);
      if (ws) this.ws = ws;

      this.bp = Database.ProjectData.BehaviorPacks.get(path)?.folder;
      this.rp = Database.ProjectData.ResourcePacks.get(path)?.folder;
    }

    if (!this.bp) this.bp = Database.ProjectData.BehaviorPacks.packs[0]?.folder;
    if (!this.rp) this.rp = Database.ProjectData.ResourcePacks.packs[0]?.folder;
    if (!this.wl) this.wl = Database.ProjectData.Worlds.packs[0]?.folder;
  }

  BehaviorPack(): string {
    if (this.bp) return this.bp;

    const message = "This action requires behaviorpack with manifest to be present and findable for the plugin!";
    Manager.Connection.window.showErrorMessage(message);
    throw new Error(message);
  }

  ResourcePack(): string {
    if (this.rp) return this.rp;

    const message = "This action requires resourcepack with manifest to be present and findable for the plugin!";
    Manager.Connection.window.showErrorMessage(message);
    throw new Error(message);
  }

  WorkSpace(): string {
    if (this.ws) return this.ws;

    const message = "This action requires a workspace to be opened!";
    Manager.Connection.window.showErrorMessage(message);
    throw new Error(message);
  }

  WorldFolder(): string {
    if (this.wl) return this.wl;

    const message = "This action requires world with manifest to be present and findable for the plugin!";
    Manager.Connection.window.showErrorMessage(message);
    throw new Error(message);
  }

  GetFolder(command: string): string {
    if (command.includes("behavior-")) return this.BehaviorPack();
    if (command.includes("resource-")) return this.ResourcePack();
    if (command.includes("world-")) return this.WorldFolder();

    return this.WorkSpace();
  }

  Ensure(): Context {
    const ensured = new _internalContext(this._path);
    const ws = this.WorkSpace();

    ensured.bp = this.bp || Vscode.join(ws, "behavior_packs", "unnamed_bp");
    ensured.rp = this.rp || Vscode.join(ws, "resource_packs", "unnamed_rp");
    ensured.wl = this.wl || Vscode.join(ws, "worlds", "unnamed_wl");

    return ensured;
  }
}
