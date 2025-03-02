import { FileChangeType, FileEvent } from "vscode-languageserver-protocol";
import { TextDocument } from "./text-document";

export interface DocumentEvent extends FileEvent {
  document: TextDocument | undefined;
}

export interface DocumenterGetter {
  get(uri: string): TextDocument | undefined;
}

export class LazyDocumentEvent implements DocumentEvent {
  private _document: TextDocument | undefined;
  private _uri: string;
  private _type: FileChangeType;
  private _getter: DocumenterGetter;

  constructor(getter: DocumenterGetter, uri: string, type: FileChangeType) {
    this._getter = getter;
    this._uri = uri;
    this._type = type;
    this._document = undefined;
  }
  get uri(): string {
    return this._uri;
  }
  get type(): FileChangeType {
    return this._type;
  }

  get document(): TextDocument | undefined {
    if (this._document) return this._document;

    this._document = this._getter.get(this._uri);
    return this._document;
  }
}
