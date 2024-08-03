import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { Connection } from "vscode-languageserver";
import { DeleteFilesParams, Diagnostic, InitializeParams } from "vscode-languageserver-protocol";
import { Diagnoser } from "bc-minecraft-bedrock-diagnoser";
import { DocumentManager } from "../documents/manager";
import { ExtensionContext } from "../extension/context";
import { getFilename } from "../../util";
import { IExtendedLogger } from "../logger/logger";
import { InternalContext } from "./context";
import { IService } from "../services/service";
import { TextDocument } from "../documents";

export class DiagnoserService extends BaseService implements Pick<IService, "onInitialize"> {
  name: string = "diagnoser";
  private _context: InternalContext;
  private _diagnoser: Diagnoser;

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    logger = logger.withPrefix("[diagnoser]");
    super(logger, extension);

    this._context = new InternalContext(logger, this.extension.documents, () => extension.database.ProjectData);
    this._diagnoser = new Diagnoser(this._context);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    params.capabilities.textDocument?.diagnostic;

    this.addDisposable(connection.workspace.onDidDeleteFiles(this.onDidDeleteFiles.bind(this)));
  }

  diagnose(doc: TextDocument): void {
    if (this.extension.state.workspaces.traversed === false) {
      this.logger.debug(`skipping diagnostics: ${getFilename(doc.uri)}`);
      return;
    }

    this._diagnoser.process(doc);
  }

  set(doc: Pick<TextDocument, "uri"> & Partial<Pick<TextDocument, "version">>, diagnostics: Diagnostic[]) {
    return this.extension.connection.sendDiagnostics({
      diagnostics,
      uri: doc.uri,
      version: doc.version,
    });
  }

  clear(doc: Pick<TextDocument, "uri"> & Partial<Pick<TextDocument, "version">>) {
    return this.set(doc, []);
  }

  onDidDeleteFiles(params: DeleteFilesParams) {
    params.files.forEach((file) => this.clear(file));
  }
}
