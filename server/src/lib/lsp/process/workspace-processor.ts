import {
  Connection,
  InitializeParams,
  TextDocumentChangeEvent,
  WorkspaceFolder,
  WorkspaceFoldersChangeEvent,
} from "vscode-languageserver";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { IService } from "../services/service";
import { Languages } from "@blockception/shared";
import { Pack } from "bc-minecraft-bedrock-project";
import { PackProcessor } from "./pack-processor";
import { ProgressBar } from "../progress";
import { QueueProcessor } from "@daanv2/queue-processor";
import { TextDocument } from "../documents/text-document";

export class WorkspaceProcessor extends BaseService implements Pick<IService, "onInitialize" | "start"> {
  name: string = "workspace processor";
  private _packProcessor: PackProcessor;

  constructor(logger: IExtendedLogger, extension: ExtensionContext, packProcessor: PackProcessor) {
    super(logger.withPrefix("[ws pros]"), extension);

    this._packProcessor = packProcessor;
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    //provides diagnostics and such
    const documents = this.extension.documents;
    documents.onDidSave(this.onDocumentChanged.bind(this));

    this.addDisposable(connection.workspace.onDidChangeWorkspaceFolders(this.onWorkspaceFolderChanged.bind(this)));
  }

  /**
   * Watch for project files being update that might changes settings for the workspace
   * @param e
   * @returns
   */
  private async onDocumentChanged(e: TextDocumentChangeEvent<TextDocument>): Promise<void> {
    if (this.extension.state.workspaces.traversed === false) return;
    const { document } = e;

    if (document.languageId === Languages.McProjectIdentifier) {
      return this.traverse();
    }
  }

  /**
   * The event that is called when any workspaces are added / removed
   * @param params
   */
  private async onWorkspaceFolderChanged(params: WorkspaceFoldersChangeEvent) {
    for (const ws of params.removed) {
      await this.remove(ws);
    }

    for (const ws of params.added) {
      await this.process(ws);
    }
  }

  start(): void {
    this.traverse();
  }

  async traverse(): Promise<void> {
    this.extension.state.workspaces.traversed = false;
    this.logger.info("traversing all workspaces");
    let progress = await ProgressBar.create(this.extension, "processing workspaces", 0, 1);

    const workspaces = (await this.get()) ?? [];
    progress.setMaximum(workspaces.length * 2);

    for (const ws of workspaces) {
      progress.addValue(1);
      progress.sendProgress(ws.name);

      await this.process(ws);
    }

    this.extension.state.workspaces.traversed = true;
    progress = await ProgressBar.create(this.extension, "diagnosing workspaces", 0, 1);
    progress.sendMessage;

    for (const ws of workspaces) {
      progress.addValue(1);
      progress.sendProgress(ws.name);

      await this.diagnose(ws);
    }

    progress.done();
  }

  async process(workspace: WorkspaceFolder) {
    this.logger.info(`processing workspace ${workspace.name}`, workspace);
    const packs = await this._packProcessor.discover(workspace.uri);

    return QueueProcessor.forEach(packs, (pack) => this._packProcessor.process(pack));
  }

  async remove(workspace: WorkspaceFolder) {
    this.logger.info(`removing workspace ${workspace.name}`, workspace);
    const packs = await this.packs(workspace);

    await QueueProcessor.map(packs, (pack) => this._packProcessor.remove(pack));
  }

  async diagnose(workspace: WorkspaceFolder) {
    this.logger.info(`diagnosing workspace ${workspace.name}`, workspace);
    const packs = await this.packs(workspace);

    return QueueProcessor.forEach(packs, (pack) => {
      this._packProcessor.diagnose(pack);
    });
  }

  async packs(workspace: WorkspaceFolder): Promise<Pack[]> {
    return this._packProcessor.get().filter((pack) => pack.folder.startsWith(workspace.uri));
  }

  /**
   * Retrieves all the workspaces the IDE has open, if an error occurs, an empty [] is returned.
   * @returns
   */
  async get(): Promise<WorkspaceFolder[] | null> {
    return this.extension.connection.workspace.getWorkspaceFolders().catch((err) => {
      this.logger.recordError(err);
      return null;
    });
  }
}
