import { TextDocument } from "../../types/Document/TextDocument";
import { BaseSemanticTokensBuilder } from "./base";
import { JsonSemanticTokensBuilder } from "./json";

/**
 *
 */
export class McfunctionSemanticTokensBuilder extends BaseSemanticTokensBuilder {
  /**
   *
   * @param doc
   */
  constructor(doc: TextDocument) {
    super(doc);
  }

  /**
   *
   * @param Builder
   * @returns
   */
  static FromJson(Builder: JsonSemanticTokensBuilder): McfunctionSemanticTokensBuilder {
    const Out = new McfunctionSemanticTokensBuilder(Builder.doc);
    Out.Builder = Builder.Builder;

    return Out;
  }
}
