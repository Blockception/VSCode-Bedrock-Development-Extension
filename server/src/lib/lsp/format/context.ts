import { CancellationToken, WorkDoneProgressReporter } from "vscode-languageserver";
import { TextDocument } from "../documents";

export interface FormatContext {
  document: TextDocument;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}
