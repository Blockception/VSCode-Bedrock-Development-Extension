import { TextDocument } from "../Types/Document/include";

/**
 *
 */
export interface SimpleContext<T> {
  /** */
  readonly doc: TextDocument;
  /** */
  readonly receiver: T;
}
