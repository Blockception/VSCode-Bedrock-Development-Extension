import { LocationWord, RangedWord } from "bc-vscode-words";
import { SemanticTokens, SemanticTokensBuilder } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { TextDocument } from "../../Types/Document/TextDocument";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../include";
import { JsonSemanticTokensBuilder } from "./include";

export class McfunctionSemanticTokensBuilder {
  public Builder: SemanticTokensBuilder;
  public doc: TextDocument;

  constructor(doc: TextDocument) {
    this.doc = doc;
    this.Builder = new SemanticTokensBuilder();
  }

  Build(): SemanticTokens {
    return this.Builder.build();
  }

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
    let p = this.doc.positionAt(startindex);
    let length = endindex - startindex;
    this.Builder.push(p.line, p.character, length, tokenType, tokenModifier);
  }

  AddWord(word: LocationWord | RangedWord, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    let p: Position = RangedWord.is(word) ? word.range.start : word.location.range.start;

    let length = word.text.length;
    this.Builder.push(p.line, p.character, length, tokenType, tokenModifier);
  }

  AddAt(line: number, char: number, length: number, tokenType: SemanticTokensEnum, tokenModifier: SemanticModifiersEnum = SemanticModifiersEnum.declaration): void {
    this.Builder.push(line, char, length, tokenType, tokenModifier);
  }

  static FromJson(Builder: JsonSemanticTokensBuilder): McfunctionSemanticTokensBuilder {
    let Out = new McfunctionSemanticTokensBuilder(Builder.doc);
    Out.Builder = Builder.Builder;

    return Out;
  }
}
