import { CancellationToken, HoverParams, WorkDoneProgressReporter } from "vscode-languageserver";
import { TextDocument } from "../documents";

export interface HoverContext {
  document: TextDocument;
  params: HoverParams;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}
