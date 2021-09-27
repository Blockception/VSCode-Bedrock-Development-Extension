import { TextDocument } from "../../Types/Document/TextDocument";
import { BaseSemanticTokensBuilder } from "./BaseSemanticTokensBuilder";

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
