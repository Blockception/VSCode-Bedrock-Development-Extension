import { TextDocument } from "../../documents/text-document";
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
