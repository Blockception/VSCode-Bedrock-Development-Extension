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
   * @param startindex
   * @param endindex
   * @param tokenType
   * @param tokenModifier
   */
  Add(startindex: number, endindex: number, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    const p = this.doc.positionAt(startindex);
    const length = endindex - startindex;

    this.Builder.push(p.line, p.character, length, tokenType, tokenModifier);
  }

  /**
   *
   * @param word
   * @param tokenType
   * @param tokenModifier
   */
  AddWord(word: OffsetWord, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    const p = this.doc.positionAt(word.offset);
    const length = word.text.length;

    this.Builder.push(p.line, p.character, length, tokenType, tokenModifier);
  }

  /**
   *
   * @param line
   * @param char
   * @param length
   * @param tokenType
   * @param tokenModifier
   */
  AddAt(line: number, char: number, length: number, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    this.Builder.push(line, char, length, tokenType, tokenModifier);
  }
}
