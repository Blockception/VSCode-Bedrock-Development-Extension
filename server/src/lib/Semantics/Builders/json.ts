import { TextDocument } from "../../types/Document/TextDocument";
import { BaseSemanticTokensBuilder } from "./base";

/**
 *
 */
export class JsonSemanticTokensBuilder extends BaseSemanticTokensBuilder {
  /**
   *
   * @param doc
   */
  constructor(doc: TextDocument) {
    super(doc);
  }
}
