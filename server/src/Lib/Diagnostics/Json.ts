import { Diagnostic, DiagnosticSeverity, Range } from "vscode-languageserver";
import { TextDocument } from "../Types/Document/TextDocument";
import { EmptyTypes } from "../Types/General/include";

export function InvalidJson(doc: TextDocument, error: any): void {
  //TODO Throw Empty or Nothing
  let Message = "Invalid json";
  let R = EmptyTypes.EmptyRange();
  let Errors: Diagnostic[] = [];

  if (error.message) {
    Message = error.message;

    if (Message.startsWith("Unexpected token")) {
      let Index = Message.indexOf("position ");
      let Number = Message.slice(Index + 8, Message.length);
      let position = doc.positionAt(parseInt(Number));
      R = Range.create(position, position);

      Errors.push({ message: Message, range: R, severity: DiagnosticSeverity.Error });
    }
  }
}

export function ValidJson(doc: TextDocument): void {}
