import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { ExtensionContext } from "../extension/context";
import { identifyDocument } from "./languageId";
import { IExtendedLogger } from "../logger/logger";
import { IService } from "../services/service";
import { ProgressBar } from "../progress";
import { QueueProcessor } from "@daanv2/queue-processor";
import { readDocument } from "./io";
import { TextDocument } from "./text-document";
import { TextDocumentFactory } from "./factory";
import { Vscode } from "../../util";
import {
  CancellationToken,
  Connection,
  InitializeParams,
  TextDocuments,
  TextDocumentSyncKind,
} from "vscode-languageserver";

import * as vscode from "vscode-languageserver-textdocument";

export type ContentType = string | vscode.TextDocument | undefined;
export interface IDocumentManager
  extends Pick<DocumentManager, "get" | "forEach" | "onDidChangeContent" | "onDidClose" | "onDidOpen" | "onDidSave"> {}

export class DocumentManager
  extends BaseService
  implements
    Partial<IService>,
    Pick<TextDocuments<TextDocument>, "onDidChangeContent" | "onDidClose" | "onDidOpen" | "onDidSave">
{
  public readonly name: string = "documents";
  private _documents: TextDocuments<TextDocument>;
  private _factory: TextDocumentFactory;

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[documents]"), extension);

    this._factory = new TextDocumentFactory(logger, extension);
    this._documents = new TextDocuments(this._factory);
  }

  /** @inheritdoc */
  get onDidOpen() {
    return this._documents.onDidOpen;
  }
  /** @inheritdoc */
  get onDidChangeContent() {
    return this._documents.onDidChangeContent;
  }
  /** @inheritdoc */
  get onDidClose() {
    return this._documents.onDidClose;
  }
  /** @inheritdoc */
  get onDidSave() {
    return this._documents.onDidSave;
  }

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void {
    capabilities.set("textDocumentSync", TextDocumentSyncKind.Incremental);
    capabilities.addWorkspace({
      workspaceFolders: {
        changeNotifications: true,
        supported: true,
      },
      fileOperations: {
        didCreate: { filters: [{ scheme: "file", pattern: { glob: "**/*.{mcfunction,json}" } }] },
        didDelete: { filters: [{ scheme: "file", pattern: { glob: "**/*.{mcfunction,json}" } }] },
        didRename: { filters: [{ scheme: "file", pattern: { glob: "**/*.{mcfunction,json}" } }] },
      },
    });
  }

  setupHandlers(connection: Connection): void {
    this._documents.listen(connection);
  }

  get(uri: string): TextDocument | undefined;
  get(uri: string, content: ContentType): TextDocument | undefined;
  get(uri: string, content: ContentType, languageID: string): TextDocument | undefined;
  get(uri: string, content?: ContentType, languageID?: string): TextDocument | undefined;

  /**
   * Retrieve the given document from the
   */
  get(uri: string, content?: ContentType, languageID?: string): TextDocument | undefined {
    const fsPath = Vscode.FromFs(uri);
    if (languageID === undefined || languageID === "") {
      languageID = identifyDocument(fsPath);
    }

    if (typeof content === "string") {
      return this._factory.create(fsPath, languageID, 1, content);
    }
    if (typeof content !== "undefined") {
      return this._factory.extend(content);
    }

    const doc = this._documents.get(fsPath);
    if (doc) return this._factory.extend(doc);

    const text = readDocument(fsPath, this.logger);
    if (text) {
      return this._factory.create(fsPath, languageID, 1, text);
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
  ): Promise<string[]> {
    reporter.addMaximum(uris.length);

    return QueueProcessor.forEach(uris, (uri) => {
      if (token.isCancellationRequested) return;

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
    });
  }
}
