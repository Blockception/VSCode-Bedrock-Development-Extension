import { TextDocument } from "../../documents/text-document";
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
