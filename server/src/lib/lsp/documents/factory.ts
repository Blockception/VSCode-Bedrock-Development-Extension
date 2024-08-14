import { DocumentUri, TextDocumentContentChangeEvent, TextDocumentsConfiguration } from "vscode-languageserver";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { TextDocument, WrappedTextDocument } from "./text-document";

import * as vscode from "vscode-languageserver-textdocument";

export class TextDocumentFactory extends BaseService implements TextDocumentsConfiguration<TextDocument> {
  readonly name: string = "textdocument factory";

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix("[textdocument factory]"), extension);
  }

  /**
   * Extends the vscode document into an internal format.
   * @param doc The document to enhance
   * @returns A upgraded version
   */
  extend(doc: vscode.TextDocument): TextDocument {
    if (doc instanceof WrappedTextDocument) {
      return doc;
    }

    return new WrappedTextDocument(doc, this.extension);
  }

  /** @inheritdoc */
  create(uri: DocumentUri, languageId: string, version: number, content: string): TextDocument {
    return this.extend(vscode.TextDocument.create(uri, languageId, version, content));
  }

  /** @inheritdoc */
  update(document: TextDocument, changes: TextDocumentContentChangeEvent[], version: number): TextDocument {
    if (document instanceof WrappedTextDocument) {
      return this.extend(vscode.TextDocument.update(document.base, changes, version));
    }

    return this.extend(vscode.TextDocument.update(document, changes, version));
  }
}
