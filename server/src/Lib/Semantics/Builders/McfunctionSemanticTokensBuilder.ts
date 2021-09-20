import { LocationWord, OffsetWord, RangedWord } from "bc-vscode-words";
import { SemanticTokens, SemanticTokensBuilder } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../../Types/Document/TextDocument";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../include";
import { JsonSemanticTokensBuilder } from "./JsonSemanticTokensBuilder";

/**
 *
 */
export class McfunctionSemanticTokensBuilder {
  public Builder: SemanticTokensBuilder;
  public doc: TextDocument;

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

  AddWord(word: LocationWord | RangedWord | OffsetWord, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    let P: Position;

    if (OffsetWord.is(word)) {
      P = this.doc.positionAt(word.offset);
    } else if (RangedWord.is(word)) {
      P = word.range.start;
    } else {
      P = word.location.range.start;
    }

    const length = word.text.length;
    this.Builder.push(P.line, P.character, length, tokenType, tokenModifier);
  }

  AddAt(line: number, char: number, length: number, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    this.Builder.push(line, char, length, tokenType, tokenModifier);
  }

  static FromJson(Builder: JsonSemanticTokensBuilder): McfunctionSemanticTokensBuilder {
    const Out = new McfunctionSemanticTokensBuilder(Builder.doc);
    Out.Builder = Builder.Builder;

    return Out;
  }
}
