import { Connection, TextDocumentChangeEvent } from "vscode-languageserver";
import {
  CreateFilesParams,
  DeleteFilesParams,
  InitializeParams,
  RenameFilesParams,
} from "vscode-languageserver-protocol";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { ContentType } from "../documents/manager";
import { DiagnoserService } from "../diagnostics/service";
import { ExtensionContext } from "../extension";
import { getFilename } from "../../util";
import { Glob } from "../../files/glob";
import { IExtendedLogger } from "../logger/logger";
import { IService } from "../services/service";
import { TextDocument } from "../documents/text-document";

export class DocumentProcessor extends BaseService implements Partial<IService> {
  name: string = "document processor";
  private _diagnoser: DiagnoserService;

  constructor(logger: IExtendedLogger, extension: ExtensionContext, diagnoser: DiagnoserService) {
    super(logger.withPrefix("[doc pros]"), extension);
    this._diagnoser = diagnoser;
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
    //provides diagnostics and such
    const { documents } = this.extension;
    documents.onDidOpen(this.onDocumentChanged.bind(this));
    documents.onDidSave(this.onDocumentChanged.bind(this));
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.workspace.onDidCreateFiles(this.onDidCreateFiles.bind(this)),
      connection.workspace.onDidDeleteFiles(this.onDidDeleteFiles.bind(this)),
      connection.workspace.onDidRenameFiles(this.onDidRenameFiles.bind(this))
    );
  }

  private onDocumentChanged(e: TextDocumentChangeEvent<TextDocument>) {
    const doc = this.extension.documents.get(e.document.uri, e.document, e.document.languageId);
    if (doc === undefined) return;

    return this.process(doc);
  }

  get(uri: string): TextDocument;
  get(uri: string, content: ContentType): TextDocument;
  get(uri: string, content: ContentType, languageID: string): TextDocument;
  get(uri: string, content?: ContentType, languageID?: string): TextDocument | undefined {
    return this.extension.documents.get(uri, content, languageID);
  }

  delete(uri: string) {
    this.extension.database.ProjectData.deleteFile(uri);
    this._diagnoser.clear({ uri });
  }

  /**
   *
   * @param document
   */
  process(document: TextDocument): void {
    const filename = getFilename(document.uri);
    const conf = document.configuration();
    this.logger.debug(`processing document: ${filename}`);

    try {
      if (conf.ignores.patterns.length == 0 || !Glob.isMatch(document.uri, conf.ignores.patterns)) {
        this.extension.database.ProjectData.process(document);
      } else {
        this.logger.info(`ignoring file ${document.uri}`);
      }
    } catch (error) {
      this.logger.recordError(error, document);
    }
  }

  diagnose(doc: TextDocument): void | Promise<void> {
    return this._diagnoser.diagnose(doc);
  }

  private onDidDeleteFiles(params: DeleteFilesParams) {
    this.logger.debug("received deleted files", params);

    params.files.forEach((file) => this.delete(file.uri));
  }

  private onDidCreateFiles(params: CreateFilesParams) {
    this.logger.debug("received created files", params);

    params.files.forEach((file) => {
      const doc = this.extension.documents.get(file.uri);
      if (doc === undefined) return;

      return this.process(doc);
    });
  }

  private onDidRenameFiles(params: RenameFilesParams) {
    this.logger.debug("received files rename", params);

    params.files.forEach((file) => this.delete(file.oldUri));
    params.files.forEach((file) => {
      const doc = this.extension.documents.get(file.newUri);
      if (doc === undefined) return;

      return this.process(doc);
    });
  }
}
