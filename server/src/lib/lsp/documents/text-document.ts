import { Database } from "../../lsp/database/database";
import { MCProject } from "bc-minecraft-project";
import { MCProjectprovider } from "../../project/interfaces";
import { Range } from "vscode-languageserver-types";
import { TextDocumentContentChangeEvent } from "vscode-languageserver";
import { getFilename } from "../../util";

import * as vscode from "vscode-languageserver-textdocument";
import * as mcbe from "bc-minecraft-bedrock-project";
import { ExtensionContext } from "../extension/context";

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
  configuration(): MCProject;

  /**
   * Returns the associated pack to the file
   */
  pack(): mcbe.Pack | undefined;

  /**
   * Returns the filename of the document being worked on
   */
  filename(): string;

  /**
   * Returns the extension context
   */
  extension(): ExtensionContext;
}

export class WrappedTextDocument implements TextDocument {
  protected _document: vscode.TextDocument;
  /**A hidden field that helps with storing the cache */
  protected _pack: mcbe.Pack | null | undefined;
  protected _extension: ExtensionContext;

  constructor(document: vscode.TextDocument, extension: ExtensionContext) {
    this._document = document;
    this._extension = extension;
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
  pack(): mcbe.Pack | undefined {
    if (this._pack) return this._pack;

    return (this._pack = this._extension.database.ProjectData.get(this.uri));
  }

  /** @inheritdoc */
  configuration(): MCProject {
    return this.pack()?.context ?? this._extension.database.WorkspaceData.getProject(this.uri, this._extension.settings);
  }

  /** @inheritdoc */
  filename(): string {
    return getFilename(this.uri);
  }

  /** @inheritdoc */
  extension(): ExtensionContext {
    return this._extension;
  }

  /** @inheritdoc */
  getLine(lineIndex: number): string {
    return this.getText({
      start: { line: lineIndex, character: 0 },
      end: { line: lineIndex, character: Number.MAX_VALUE },
    });
  }
}
