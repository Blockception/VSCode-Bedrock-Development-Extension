import { TextDocument } from "../../types/Document/TextDocument";
import { BaseSemanticTokensBuilder } from "./base";

/**
 *
 */
export class MolangSemanticTokensBuilder extends BaseSemanticTokensBuilder {
  /**
   *
   * @param doc
   */
  constructor(doc: TextDocument) {
    super(doc);
  }
}
