import { TextDocument } from "../types/Document/TextDocument";

/**
 *
 */
export interface SimpleContext<T> {
  /** */
  readonly doc: TextDocument;
  /** */
  readonly receiver: T;
  /** */
  readonly cursor: number;
}

/***
 *
 */
export namespace SimpleContext {
  /**
   *
   * @param doc
   * @param receiver
   * @param cursor
   * @returns
   */
  export function create<T>(doc: TextDocument, receiver: T, cursor: number): SimpleContext<T> {
    return { doc, receiver, cursor };
  }
}
