import { Connection } from "vscode-languageserver";
import { DeleteFilesParams, Diagnostic, InitializeParams } from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { TextDocument } from "../documents";
import { Database } from "../database";
import { getFilename } from "../../util";

export class DiagnoserService extends BaseService implements Pick<IService, "onInitialize"> {
  name: string = "diagnoser";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[diagnoser]"), extension);

    const context = createContext(getCacheFn);
    const out = new Diagnoser<TextDocument>(context);
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    params.capabilities.textDocument?.diagnostic;

    connection.workspace.onDidDeleteFiles(this.onDidDeleteFiles.bind(this));
  }

  diagnose(doc: TextDocument): void {
    if (this.extension.state.workspaces.traversed === false) {
      this.logger.debug(`skipping diagnostics: ${getFilename(doc.uri)}`);
      return;
    }

    //Send it off to the diagnoser
    Database.Diagnoser.process(doc);
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
