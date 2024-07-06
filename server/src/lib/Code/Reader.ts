import { TextDocument } from "../Types/Document/TextDocument";

/**
 *
 */
export class DocumentReader {
  /** */
  public doc: TextDocument;
  /** */
  public index: number;

  /**
   *
   * @param doc
   */
  constructor(doc: TextDocument) {
    this.doc = doc;
    this.index = 0;
  }

  /** */
  ReadLine(): string {
    const Line = this.doc.getLine(this.index);
    this.index++;

    return Line;
  }

  /**returns true or false if the reader is at the end*/
  IsDone(): boolean {
    return this.index >= this.doc.lineCount;
  }

  /**returns true or false if the reader is not yet at the end*/
  IsReading(): boolean {
    return this.index < this.doc.lineCount;
  }
}
