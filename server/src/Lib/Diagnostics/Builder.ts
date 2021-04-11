import { LocationWord, OffsetWord, PositionCalculator, RangedWord } from "bc-vscode-words";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { Range, TextDocument } from "vscode-languageserver-textdocument";
import { Manager } from "../Manager/include";
import { EmptyTypes } from "../Types/General/Empty";

/** A builder that helps with providing diagnostics */
export class DiagnosticsBuilder {
  private calculator: PositionCalculator;
  public doc: TextDocument;
  public Items: Diagnostic[];

  constructor(doc: TextDocument) {
    this.doc = doc;
    this.calculator = PositionCalculator.Wrap(doc);
    this.Items = [];
  }

  public SendDiagnostics() {
    Manager.Diagnostic.SendDiagnostics(this.doc, this.Items);
  }

  public AddWord(Word: OffsetWord | RangedWord | LocationWord, message: string, serverity: DiagnosticSeverity = DiagnosticSeverity.Error) {
    let range: Range;

    if (OffsetWord.is(Word)) {
      range = this.calculator.rangeOf(Word.offset, Word.offset + Word.text.length);
    } else if (RangedWord.is(Word)) {
      range = Word.range;
    } else {
      range = Word.location.range;
    }

    this.Items.push({
      message: message,
      severity: serverity,
      range: range,
    });
  }

  public Add(message: string, range: Range | undefined = undefined, serverity: DiagnosticSeverity = DiagnosticSeverity.Error) {
    if (range === undefined) {
      range = EmptyTypes.EmptyRange();
    }

    this.Items.push({
      message: message,
      severity: serverity,
      range: range,
    });
  }

  public AddAt(message: string, line: number, startindex: number, endindex: number, serverity: DiagnosticSeverity = DiagnosticSeverity.Error) {
    this.Add(message, { start: { character: startindex, line: line }, end: { character: endindex, line: line } }, serverity);
  }
}
