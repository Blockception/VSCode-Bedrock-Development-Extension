import { TextDocument } from "../Types/Document/TextDocument";

/**
 *
 */
export interface SimpleContext<T> {
  /** */
  readonly doc: TextDocument;
  /** */
  readonly receiver: T;
}

/***
 *
 */
export namespace SimpleContext {
  /**
   *
   * @param doc
   * @param receiver
   * @returns
   */
  export function create<T>(doc: TextDocument, receiver: T): SimpleContext<T> {
    return { doc: doc, receiver: receiver };
  }
}
