import { ExecuteCommandParams } from "vscode-languageserver";
import { Database } from "../../Database/include";
import { Manager } from '../../Manager/include';

export interface context {
  BehaviorPack(): string;
  ResourcePack(): string;
  WorkSpace(): string;
  WorldFolder() : string;
}

export function GetContext(params: ExecuteCommandParams): context {
  const args = params.arguments;

  if (args) {
    return new _internalContext(args[args.length - 1]);
  }

  return new _internalContext(undefined);
}

export function GetContextCall(data: ExecuteCommandParams, callback: (c: context, data: ExecuteCommandParams) => void): void {
  const c = GetContext(data);
  callback(c, data);
}

class _internalContext implements context {
  private __path: string | undefined;
  private ws : string | undefined;
  private bp : string | undefined;
  private rp : string | undefined;
  private wl : string | undefined;

  constructor(path: string | undefined) {
    if ((this.__path = path)) {
      this.ws = Database.WorkspaceData.getFolder(path);

      this.bp = Database.ProjectData.BehaviorPacks.get(path)?.folder;
      this.rp = Database.ProjectData.ResourcePacks.get(path)?.folder;
    }

    if (!this.ws) this.ws = Database.WorkspaceData.getFirst();
    if (!this.bp) this.bp = Database.ProjectData.BehaviorPacks.packs[0]?.folder;
    if (!this.rp) this.rp = Database.ProjectData.ResourcePacks.packs[0]?.folder;
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
}