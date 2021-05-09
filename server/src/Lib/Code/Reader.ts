import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../Types/Document/Document";

export class DocumentReader {
  public doc: TextDocument;
  public index: number;

  constructor(doc: TextDocument) {
    this.doc = doc;
    this.index = 0;
  }

  ReadLine(): string {
    let Line = getLine(this.doc, this.index);
    this.index++;

    return Line;
  }

  /**
   *  returns true or false if the reader is at the end
   */
  IsDone(): boolean {
    return this.index >= this.doc.lineCount;
  }

  /**
   * returns true or false if the reader is not yet at the end
   */
  IsReading(): boolean {
    return this.index < this.doc.lineCount;
  }
}
