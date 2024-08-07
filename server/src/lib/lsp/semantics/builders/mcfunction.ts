import { TextDocument } from "../../documents/text-document";
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
    const Out = new McfunctionSemanticTokensBuilder(Builder.document);
    Out.builder = Builder.builder;

    return Out;
  }
}
