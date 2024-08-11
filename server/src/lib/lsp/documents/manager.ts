import { BaseService } from "../services/base";
import { CapabilityBuilder } from "../services/capabilities";
import { ExtensionContext } from "../extension";
import { FileOperationFilter } from "vscode-languageserver-protocol/lib/common/protocol.fileOperations";
import { identifyDocument } from "./languageId";
import { IExtendedLogger } from "../logger/logger";
import { IService } from "../services/service";
import { Processor } from "../../util";
import { ProgressBar } from "../progress";
import { readDocument } from "./io";
import { TextDocument } from "./text-document";
import { TextDocumentFactory } from "./factory";
import { URI } from "vscode-uri";
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

    const doc = this._documents.get(u.toString());
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
