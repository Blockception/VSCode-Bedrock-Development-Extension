import { provideLanguageDiagnostics } from "../Types/Languages/Diagnose";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Manager } from "../Manager/Manager";

export function ProcessLanguageFile(document: TextDocument): void {
  //Process language file
  //TODO process language files

  //provide diagnostics on the language document
  provideLanguageDiagnostics(document);
}
