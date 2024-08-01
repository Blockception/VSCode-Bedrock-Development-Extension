import { Connection, TextDocumentChangeEvent } from "vscode-languageserver";
import {
  CreateFilesParams,
  DeleteFilesParams,
  Emitter,
  InitializeParams,
  RenameFilesParams,
} from "vscode-languageserver-protocol";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { TextDocument } from "../documents/text-document";
import { Glob } from "../../files/glob";
import { getFilename, HandleError } from "../../util";
import { Database } from "../database/database";
import { ContentType, DocumentManager } from "../documents/manager";
import { DiagnoserService } from "../diagnostics/service";

export class DocumentProcessor extends BaseService implements Pick<IService, "onInitialize"> {
  name: string = "document processor";
  private _documentManager: DocumentManager;
  private _diagnoser: DiagnoserService;

  constructor(
    logger: IExtendedLogger,
    extension: ExtensionContext,
    documentManager: DocumentManager,
    diagnoser: DiagnoserService
  ) {
    super(logger.withPrefix("[doc pros]"), extension);
    this._documentManager = documentManager;
    this._diagnoser = diagnoser;
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    //provides diagnostics and such
    const { documents } = this.extension;
    documents.onDidOpen(this.onDocumentChanged.bind(this));
    documents.onDidSave(this.onDocumentChanged.bind(this));

    connection.workspace.onDidCreateFiles(this.onDidCreateFiles.bind(this));
    connection.workspace.onDidDeleteFiles(this.onDidDeleteFiles.bind(this));
    connection.workspace.onDidRenameFiles(this.onDidRenameFiles.bind(this));
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
    return this._documentManager.get(uri, content, languageID);
  }

  delete(uri: string) {
    return Database.ProjectData.deleteFile(uri);
  }

  /**
   *
   * @param document
   */
  process(document: TextDocument): void {
    const filename = getFilename(document.uri);
    const conf = document.getConfiguration();
    this.logger.debug(`processing document: ${filename}`);

    try {
      if (conf.ignores.patterns.length == 0 || !Glob.IsMatch(document.uri, conf.ignores.patterns)) {
        Database.ProjectData.process(document);
      } else {
        this.logger.info(`ignoring file ${document.uri}`);
      }
    } catch (error) {
      HandleError(error, this.logger, document);
    }
  }

  diagnose(doc: TextDocument): void | Promise<void> {
    return this._diagnoser.diagnose(doc);
  }

  private onDidDeleteFiles(onDidDeleteFiles: DeleteFilesParams) {
    throw new Error("Method not implemented.");
  }
  private onDidCreateFiles(onDidCreateFiles: CreateFilesParams) {
    throw new Error("Method not implemented.");
  }
  private onDidRenameFiles(onDidRenameFiles: RenameFilesParams) {
    throw new Error("Method not implemented.");
  }
}
