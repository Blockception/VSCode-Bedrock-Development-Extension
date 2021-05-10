import { provideLanguageDiagnostics } from "../Types/Languages/Diagnose";
import { TextDocument } from "../Types/Document/TextDocument";

export function ProcessLanguageFile(document: TextDocument): void {
  //Process language file
  //TODO process language files

  //provide diagnostics on the language document
  provideLanguageDiagnostics(document);
}
