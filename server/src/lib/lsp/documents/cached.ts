import { TextDocument } from "./text-document";

export class CacheDocuments {
  private _documents: Map<string, TextDocument>;

  constructor() {
    this._documents = new Map<string, TextDocument>();
  }

  get(uri: string): TextDocument | undefined {
    return this._documents.get(uri);
  }
  set(uri: string, document: TextDocument) {
    this._documents.set(uri, document);
    return this;
  }
  delete(uri: string) {
    return this._documents.delete(uri);
  }
  /**
   * Only add the document to the cache if the document already has the document
   * @param uri
   * @param document
   * @returns
   */
  update(uri: string, document: TextDocument) {
    if (this._documents.has(uri)) {
      this._documents.set(uri, document);
    }

    return this;
  }
  clear() {
    this._documents.clear();
    return this;
  }
}
