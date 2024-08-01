import { Database } from "../../lsp/database/database";
import { MCProject } from "bc-minecraft-project";
import { MCProjectprovider } from "../../project/interfaces";
import { Range } from "vscode-languageserver-types";
import { TextDocumentContentChangeEvent } from "vscode-languageserver";

import * as vscode from "vscode-languageserver-textdocument";
import * as mcbe from "bc-minecraft-bedrock-project";

/**
 * The extended text document to give additional code for documents
 */
export interface TextDocument extends vscode.TextDocument, mcbe.TextDocument, MCProjectprovider {
  /**
   * Returns the text at the given text line
   * @param lineIndex The index of the line to retrieve
   */
  getLine(lineIndex: number): string;

  /**
   * Returns the configuration of the text document
   */
  getConfiguration(): MCProject;

  /**
   * Returns the associated pack to the file
   */
  getPack(): mcbe.Pack | undefined;
}

export namespace TextDocument {
  /**
   * Extends the vscode document into an internal format.
   * @param doc The document to enhance
   * @returns A upgraded version
   */
  export function extend(doc: vscode.TextDocument): TextDocument {
    if (doc instanceof WrappedTextDocument) {
      return doc;
    }

    return new WrappedTextDocument(doc);
  }

  export function create(uri: vscode.DocumentUri, languageId: string, version: number, content: string): TextDocument {
    return extend(vscode.TextDocument.create(uri, languageId, version, content));
  }

  export function update(
    document: vscode.TextDocument,
    changes: TextDocumentContentChangeEvent[],
    version: number
  ): TextDocument {
    return extend(vscode.TextDocument.update(document, changes, version));
  }
}

export class WrappedTextDocument implements TextDocument {
  protected _document: vscode.TextDocument;
  /**A hidden field that helps with storing the cache */
  protected _pack: mcbe.Pack | null | undefined;

  constructor(document: vscode.TextDocument) {
    this._document = document;
  }

  /** @inheritdoc */
  public get uri() {
    return this._document.uri;
  }

  /** @inheritdoc */
  public get languageId() {
    return this._document.languageId;
  }

  /** @inheritdoc */
  public get version() {
    return this._document.version;
  }

  /** @inheritdoc */
  public get lineCount() {
    return this._document.lineCount;
  }

  /** @inheritdoc */
  getText(range?: Range): string {
    return this._document.getText(range);
  }

  /** @inheritdoc */
  positionAt(offset: number): vscode.Position {
    return this._document.positionAt(offset);
  }

  /** @inheritdoc */
  offsetAt(position: vscode.Position): number {
    return this._document.offsetAt(position);
  }

  /** @inheritdoc */
  getPack(): mcbe.Pack | undefined {
    if (this._pack) return this._pack;

    return (this._pack = Database.ProjectData.get(this.uri));
  }

  /** @inheritdoc */
  getLine(lineIndex: number): string {
    return this.getText({
      start: { line: lineIndex, character: 0 },
      end: { line: lineIndex, character: Number.MAX_VALUE },
    });
  }

  /** @inheritdoc */
  getConfiguration(): MCProject {
    return this.getPack()?.context ?? Database.WorkspaceData.getProject(this.uri);
  }
}
