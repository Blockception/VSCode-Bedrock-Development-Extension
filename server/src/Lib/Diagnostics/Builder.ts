import { LocationWord, OffsetWord, PositionCalculator, RangedWord } from "bc-vscode-words";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { Range } from "vscode-languageserver-textdocument";
import { Manager } from "../Manager/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { EmptyTypes } from "../Types/General/Empty";

/** A builder that helps with providing diagnostics */
export class DiagnosticsBuilder {
  private calculator: PositionCalculator;
  public doc: TextDocument;
  public Items: Diagnostic[];
  private source: string;

  /**
   *
   * @param doc
   */
  constructor(doc: TextDocument) {
    this.doc = doc;
    this.calculator = PositionCalculator.Wrap(doc);
    this.Items = [];
    this.source = getSource(doc.languageId);
  }

  /**
   *
   */
  public SendDiagnostics() {
    Manager.Diagnostic.SendDiagnostics(this.doc, this.Items);
  }

  /**
   *
   * @param Word
   * @param message
   * @param serverity
   */
  public AddWord(Word: OffsetWord | RangedWord | LocationWord, message: string, serverity: DiagnosticSeverity = DiagnosticSeverity.Error): Diagnostic {
    let range: Range;

    if (OffsetWord.is(Word)) {
      range = this.calculator.rangeOf(Word.offset, Word.offset + Word.text.length);
    } else if (RangedWord.is(Word)) {
      range = Word.range;
    } else {
      range = Word.location.range;
    }

    return this.Push({ message: message, severity: serverity, range: range });
  }

  /**
   *
   * @param message
   * @param range
   * @param serverity
   * @returns
   */
  public Add(message: string, range: Range | undefined = undefined, serverity: DiagnosticSeverity = DiagnosticSeverity.Error): Diagnostic {
    if (range === undefined) {
      range = EmptyTypes.EmptyRange();
    }

    return this.Push({ message: message, severity: serverity, range: range });
  }

  /**
   *
   * @param message
   * @param line
   * @param startindex
   * @param endindex
   * @param serverity
   * @returns
   */
  public AddAt(message: string, line: number, startindex: number, endindex: number, serverity: DiagnosticSeverity = DiagnosticSeverity.Error): Diagnostic {
    return this.Add(message, { start: { character: startindex, line: line }, end: { character: endindex, line: line } }, serverity);
  }

  /**
   *
   * @param Item
   * @returns
   */
  public Push(Item: Diagnostic): Diagnostic {
    this.Items.push(Item);

    if (!Item.source) Item.source = this.source;

    return Item;
  }
}

function getSource(id: string): string {
  const index = id.indexOf("-");

  if (index >= 0) return id.substring(index + 1, id.length);

  return id;
}
