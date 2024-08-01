import { HandleError, Vscode } from "../../util";
import { identifyDocument } from "./languageId";
import { Connection, InitializeParams, TextDocuments, TextDocumentsConfiguration } from "vscode-languageserver";
import { TextDocument } from "./text-document";
import { ProgressBar } from "../progress";
import { QueueProcessor } from "@daanv2/queue-processor";
import { IExtendedLogger } from "../logger/logger";
import { readDocument } from "./io";
import { IService } from "../services/service";
import { CapabilityBuilder } from "../services/capabilities";

import * as vscode from "vscode-languageserver-textdocument";

export type ContentType = string | vscode.TextDocument | undefined;
export interface IDocumentManager
  extends Pick<DocumentManager, "get" | "forEach" | "onDidChangeContent" | "onDidClose" | "onDidOpen" | "onDidSave"> {}

export class DocumentManager
  implements
    Pick<IService, "name" | "onInitialize">,
    Pick<TextDocuments<TextDocument>, "onDidChangeContent" | "onDidClose" | "onDidOpen" | "onDidSave">
{
  private _documents: TextDocuments<TextDocument>;
  private _logger: IExtendedLogger;
  public readonly name: string = "documents";

  constructor(logger: IExtendedLogger) {
    this._logger = logger.withPrefix("[documents]");
    this._documents = new TextDocuments(TextDocument as TextDocumentsConfiguration<TextDocument>);
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

  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, connection: Connection): void {
    this._documents.listen(connection);

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
      return TextDocument.create(fsPath, languageID, 1, content);
    }
    if (typeof content !== "undefined") {
      return TextDocument.extend(content);
    }

    const doc = this._documents.get(fsPath);
    if (doc) return TextDocument.extend(doc);

    const text = readDocument(fsPath, this._logger);
    if (text) {
      return TextDocument.create(fsPath, languageID, 1, text);
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
  forEach(uris: string[], callback: (doc: TextDocument) => void, reporter: ProgressBar): Promise<string[]> {
    reporter.addMaximum(uris.length);

    return QueueProcessor.forEach(uris, (uri) => {
      //Get document
      const doc = this.get(uri);

      try {
        //If we have a document invoke the requests action
        if (doc) callback(doc);
      } catch (error) {
        HandleError(error, this._logger, uri);
      }

      reporter.addValue();
      reporter.sendProgress();
    });
  }
}
