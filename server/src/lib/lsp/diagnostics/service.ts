import { BaseService } from "../services/base";
import { Connection } from "vscode-languageserver";
import { DeleteFilesParams, Diagnostic } from "vscode-languageserver-protocol";
import { Diagnoser } from "bc-minecraft-bedrock-diagnoser";
import { ExtensionContext } from "../extension";
import { getFilename } from "../../util";
import { IExtendedLogger } from "../logger/logger";
import { InternalContext } from "./context";
import { IService } from "../services/service";
import { TextDocument } from "../documents";
import { IDocumentManager } from "../documents/manager";

export class DiagnoserService extends BaseService implements Partial<IService> {
  name: string = "diagnoser";
  private _context: InternalContext;
  private _diagnoser: Diagnoser;

  constructor(logger: IExtendedLogger, extension: ExtensionContext, documents: IDocumentManager) {
    logger = logger.withPrefix("[diagnoser]");
    super(logger, extension);

    this._context = new InternalContext(logger, documents, () => extension.database.ProjectData);
    this._diagnoser = new Diagnoser(this._context);

    this._context.onDiagnosingFinished((e) => this.set(e.doc, e.items));
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.workspace.onDidDeleteFiles(this.onDidDeleteFiles.bind(this)));
  }

  diagnose(doc: TextDocument): void {
    if (this.extension.state.workspaces.traversed === false) {
      this.logger.debug(`skipping diagnostics: ${getFilename(doc.uri)}`);
      return;
    }

    const start = Date.now();
    this._diagnoser.process(doc);

    const dur = Date.now() - start;
    if (dur > 10) {
      this.logger.info("diagnosing done", {
        uri: doc.uri,
        ms: dur,
      });
    }
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
