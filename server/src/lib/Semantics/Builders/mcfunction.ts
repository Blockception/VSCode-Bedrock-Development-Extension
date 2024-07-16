import { TextDocument } from "../../Types/Document/TextDocument";
import { BaseSemanticTokensBuilder } from "./BaseSemanticTokensBuilder";
import { JsonSemanticTokensBuilder } from "./JsonSemanticTokensBuilder";

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
