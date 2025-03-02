import {
  CancellationToken,
  Connection,
  DidChangeWatchedFilesParams,
  FileChangeType,
  TextDocumentSyncKind,
} from "vscode-languageserver";
import {
  DidChangeTextDocumentParams,
  DidCloseTextDocumentParams,
  DidOpenTextDocumentParams,
  DidSaveTextDocumentParams,
  Disposable,
  Emitter,
} from "vscode-languageserver-protocol";
import { URI } from "vscode-uri";
import { Processor } from "../../util";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { ProgressBar } from "../progress";
import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { IService } from "../services/service";
import { TextDocumentFactory } from "./factory";
import { readDocument } from "./io";
import { identifyDocument } from "./languageId";
import { TextDocument } from "./text-document";

import * as vscode from "vscode-languageserver-textdocument";
import { FileOperationFilter } from "vscode-languageserver-protocol/lib/common/protocol.fileOperations";
import { DocumentEvent, LazyDocumentEvent } from "./event";
import { CacheDocuments } from "./cached";

export type ContentType = string | vscode.TextDocument | undefined;
export type IDocumentManager = Pick<DocumentManager, "get" | "forEach" | "onDeleted" | "onCreated" | "onChanged">;

export class DocumentManager extends BaseService implements Partial<IService> {
  public readonly name: string = "documents";
  private _cachedDocuments: CacheDocuments;
  private _factory: TextDocumentFactory;
  private _onDeleted: Emitter<DocumentEvent>;
  private _onCreated: Emitter<DocumentEvent>;
  private _onChanged: Emitter<DocumentEvent>;

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[documents]"), extension);

    this._factory = new TextDocumentFactory(logger, extension);
    this._cachedDocuments = new CacheDocuments();

    this._onDeleted = new Emitter();
    this._onCreated = new Emitter();
    this._onChanged = new Emitter();
  }

  get onDeleted() {
    return this._onDeleted.event;
  }
  get onCreated() {
    return this._onCreated.event;
  }
  get onChanged() {
    return this._onChanged.event;
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    const filters: FileOperationFilter[] = [
      { pattern: { glob: "**/*.{mcfunction}", options: { ignoreCase: true } } },
      { pattern: { glob: "**/*.{json,jsonc}", options: { ignoreCase: true } } },
      { pattern: { glob: "**/*.{.mcignore,.mcattributes,.mcdefinitions}", options: { ignoreCase: true } } },
    ];

    capabilities.set("textDocumentSync", TextDocumentSyncKind.Incremental);
    capabilities.set("workspace", {
      workspaceFolders: {
        changeNotifications: true,
        supported: true,
      },
      fileOperations: {
        didCreate: { filters: filters },
        didDelete: { filters: filters },
        didRename: { filters: filters },
      },
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.onDidChangeWatchedFiles(this._onDidChangeWatchedFiles.bind(this)),
      connection.onDidSaveTextDocument(this._handleSave.bind(this)),
      connection.onDidCloseTextDocument(this._handleClose.bind(this)),
      connection.onDidOpenTextDocument(this._handleOpen.bind(this)),
      connection.onDidChangeTextDocument(this._handleChanged.bind(this))
    );
  }

  private async _onDidChangeWatchedFiles(params: DidChangeWatchedFilesParams) {
    const changes = params.changes.map((m) => new LazyDocumentEvent(this, m.uri, m.type));

    // Delete, then create, finally changed
    const disposables: Partial<Disposable>[] = [
      ...changes.filter((c) => c.type === FileChangeType.Deleted).map((c) => this._processDeleted(c)),
      ...changes.filter((c) => c.type === FileChangeType.Created).map((c) => this._processCreated(c)),
      ...changes.filter((c) => c.type === FileChangeType.Changed).map((c) => this._processChanged(c)),
    ];

    // Cleanup
    disposables.forEach((d) => d?.dispose?.call(d));
  }

  private _processDeleted(event: LazyDocumentEvent) {
    this.logger.debug("received file watch delete event", event);

    this._cachedDocuments.delete(event.uri);
    return this._onDeleted.fire(Object.freeze(event));
  }
  private _processCreated(event: LazyDocumentEvent) {
    this.logger.debug("received file watch create event", event);

    return this._onCreated.fire(Object.freeze(event));
  }
  private _processChanged(event: LazyDocumentEvent) {
    this.logger.debug("received file watch change event", event);

    return this._onChanged.fire(Object.freeze(event));
  }
  private _handleChanged(params: DidChangeTextDocumentParams) {
    if (params.contentChanges.length === 0) return;
    this.logger.debug("received changed event", params);

    let doc = this._cachedDocuments.get(params.textDocument.uri);
    if (doc) {
      doc = this._factory.update(doc, params.contentChanges, params.textDocument.version);
      this._cachedDocuments.set(doc.uri, doc);
    }
  }
  private _handleOpen(params: DidOpenTextDocumentParams) {
    this.logger.debug("received open event", params);

    const td = params.textDocument;
    const doc = this._factory.create(td.uri, td.languageId, td.version, td.text);
    this._cachedDocuments.set(doc.uri, doc);
  }
  private _handleClose(params: DidCloseTextDocumentParams) {
    this.logger.debug("received close event", params);

    return this._cachedDocuments.delete(params.textDocument.uri);
  }
  private _handleSave(params: DidSaveTextDocumentParams) {
    this.logger.debug("received saved event", params);
  }

  get(uri: string): TextDocument | undefined;
  get(uri: string, content: ContentType): TextDocument | undefined;
  get(uri: string, content: ContentType, languageID: string): TextDocument | undefined;
  get(uri: string, content?: ContentType, languageID?: string): TextDocument | undefined;

  /**
   * Retrieve the given document from the
   */
  get(uri: string, content?: ContentType, languageID?: string): TextDocument | undefined {
    const u = URI.parse(uri);
    if (languageID === undefined || languageID === "") {
      languageID = identifyDocument(u);
    }

    if (typeof content === "string") {
      return this._factory.create(u.toString(), languageID, 1, content);
    }
    if (typeof content !== "undefined") {
      return this._factory.extend(content);
    }

    const doc = this._cachedDocuments.get(u.toString()) || this._cachedDocuments.get(uri);
    if (doc) return this._factory.extend(doc);

    const text = readDocument(u, this.logger);
    if (text !== undefined) {
      return this._factory.create(u.toString(), languageID, 1, text);
    }

    //We have tried all methods of retrieving data so far
    return undefined;
  }

  /**
   *
   * @param uris
   * @param callback
   * @param reporter
   * @returns
   */
  forEach(
    uris: string[],
    callback: (doc: TextDocument) => void,
    reporter: ProgressBar,
    token: CancellationToken
  ): void | Promise<void> {
    reporter.addMaximum(uris.length);

    return Processor.forEach(
      uris,
      (uri) => {
        //Get document
        const doc = this.get(uri);

        try {
          //If we have a document invoke the requests action
          if (doc) callback(doc);
        } catch (error) {
          this.logger.recordError(error, uri);
        }

        reporter.addValue();
        reporter.sendProgress();
      },
      token
    );
  }
}
