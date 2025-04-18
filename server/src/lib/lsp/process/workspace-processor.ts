import { Pack } from "bc-minecraft-bedrock-project";
import {
  CancellationToken,
  Connection,
  WorkspaceFolder,
  WorkspaceFoldersChangeEvent
} from "vscode-languageserver";
import { Processor, Tokens } from "../../util";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { IService } from "../services/service";
import { PackProcessor } from "./pack-processor";

export class WorkspaceProcessor extends BaseService implements Partial<IService> {
  name: string = "workspace processor";
  private _packProcessor: PackProcessor;

  constructor(logger: IExtendedLogger, extension: ExtensionContext, packProcessor: PackProcessor) {
    super(logger.withPrefix("[ws pros]"), extension);

    this._packProcessor = packProcessor;
  }

  onInitialize(): void {
    setImmediate(() => this.traverse());
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.workspace.onDidChangeWorkspaceFolders(this.onWorkspaceFolderChanged.bind(this)));
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

  start(token?: CancellationToken): void {
    this.traverse(token);
  }

  async traverse(token?: CancellationToken): Promise<void> {
    const start = Date.now();
    this.extension.state.workspaces.traversed = false;
    const reporter = await this.extension.connection.window.createWorkDoneProgress();
    token = Tokens.combine(token, reporter.token);
    reporter.begin("Traversing all", 0, "", true);
    this.logger.info("traversing all workspaces");

    const workspaces = (await this.get()) ?? [];

    for (const ws of workspaces) {
      reporter.report(ws.name);
      await this.process(ws, token);
    }

    this.extension.state.workspaces.traversed = true;

    for (const ws of workspaces) {
      reporter.report(ws.name);
      await this.diagnose(ws, token);
    }

    this.logger.info("Traversing done", {
      ms: Date.now() - start
    });
    reporter.done();
  }

  async process(workspace: WorkspaceFolder, token?: CancellationToken): Promise<void> {
    const reporter = await this.extension.connection.window.createWorkDoneProgress();
    reporter.begin(`Processing workspace: ${workspace.name}`, 0, "", true);
    this.logger.info(`processing workspace ${workspace.name}`, workspace);
    const packs = await this._packProcessor.discover(workspace.uri);

    token = Tokens.combine(token, reporter.token);

    return Processor.forEach(packs, (pack) => this._packProcessor.process(pack, token), token, reporter).finally(() =>
      reporter.done()
    );
  }

  async remove(workspace: WorkspaceFolder, token?: CancellationToken) {
    this.logger.info(`removing workspace ${workspace.name}`, workspace);
    const packs = await this.packs(workspace);

    const result = await Processor.map(packs, (pack) => this._packProcessor.remove(pack), token);

    return this.extension.database.WorkspaceData.remove(workspace.uri) || result;
  }

  async diagnose(workspace: WorkspaceFolder, token?: CancellationToken) {
    const reporter = await this.extension.connection.window.createWorkDoneProgress();
    reporter.begin(`Diagnosing workspace: ${workspace.name}`, 0, "", true);
    this.logger.info(`diagnosing workspace ${workspace.name}`, workspace);
    const packs = await this.packs(workspace);

    token = Tokens.combine(token, reporter.token);
    return Processor.forEach(
      packs,
      async (pack) => this._packProcessor.diagnose(pack, token),
      token,
      reporter
    ).finally(() => reporter.done());
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
