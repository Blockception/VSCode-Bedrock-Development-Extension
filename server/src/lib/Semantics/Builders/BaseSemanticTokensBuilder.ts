import { OffsetWord } from "bc-vscode-words";
import { SemanticTokens, SemanticTokensBuilder } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../../Types/Document/TextDocument";
import { SemanticTokensEnum, SemanticModifiersEnum } from "../Legend";

/**
 *
 */
export class BaseSemanticTokensBuilder {
  /**
   *
   */
  public Builder: SemanticTokensBuilder;
  /**
   *
   */
  public doc: TextDocument;

  /**
   *
   * @param doc
   */
  constructor(doc: TextDocument) {
    this.doc = doc;
    this.Builder = new SemanticTokensBuilder();
  }

  /**
   *
   * @returns
   */
  Build(): SemanticTokens {
    return this.Builder.build();
  }

  /**
   *
   * @param offset
   * @returns
   */
  PositionAt(offset: number): Position {
    return this.doc.positionAt(offset);
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
    const p = this.doc.positionAt(startIndex);
    const length = endIndex - startIndex;

    this.Builder.push(p.line, p.character, length, tokenType, tokenModifier);

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
    const p = this.doc.positionAt(word.offset);
    const length = word.text.length;

    if (length > 0) {
      this.Builder.push(p.line, p.character, length, tokenType, tokenModifier);
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
    this.Builder.push(line, char, length, tokenType, tokenModifier);
    return this;
  }
}
