import { OffsetWord } from "bc-vscode-words";
import { SemanticTokens, SemanticTokensBuilder } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../../documents/text-document";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../constants";

/**
 *
 */
export class BaseSemanticTokensBuilder {
  public builder: SemanticTokensBuilder;
  public document: TextDocument;

  /**
   *
   * @param doc
   */
  constructor(doc: TextDocument) {
    this.document = doc;
    this.builder = new SemanticTokensBuilder();
  }

  /**
   *
   * @returns
   */
  Build(): SemanticTokens {
    return this.builder.build();
  }

  /**
   *
   * @param offset
   * @returns
   */
  PositionAt(offset: number): Position {
    return this.document.positionAt(offset);
  }

  /**
   * Adds the given text locations into the tokens builder
   * @param startIndex
   * @param endIndex
   * @param tokenType
   * @param tokenModifier
   */
  Add(
    startIndex: number,
    endIndex: number,
    tokenType: SemanticTokensEnum,
    tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration
  ): this {
    const p = this.document.positionAt(startIndex);
    const length = endIndex - startIndex;

    this.builder.push(p.line, p.character, length, tokenType, tokenModifier);

    return this;
  }

  /**
   *
   * @param word
   * @param tokenType
   * @param tokenModifier
   */
  AddWord(
    word: OffsetWord,
    tokenType: SemanticTokensEnum,
    tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration
  ): this {
    const p = this.document.positionAt(word.offset);
    const length = word.text.length;

    if (length > 0) {
      this.builder.push(p.line, p.character, length, tokenType, tokenModifier);
    }

    return this;
  }

  /**
   *
   * @param line
   * @param char
   * @param length
   * @param tokenType
   * @param tokenModifier
   */
  AddAt(
    line: number,
    char: number,
    length: number,
    tokenType: SemanticTokensEnum,
    tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration
  ): this {
    this.builder.push(line, char, length, tokenType, tokenModifier);
    return this;
  }
}
