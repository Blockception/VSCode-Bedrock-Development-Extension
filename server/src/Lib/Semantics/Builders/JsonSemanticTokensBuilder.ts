import { TextDocument } from "../../Types/Document/TextDocument";
import { BaseSemanticTokensBuilder } from "./BaseSemanticTokensBuilder";

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
