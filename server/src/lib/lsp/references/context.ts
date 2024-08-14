import { WorkDoneProgressReporter } from "vscode-languageserver";
import {
  CancellationToken,
  PartialResultParams,
  TextDocumentPositionParams,
  WorkDoneProgressParams,
} from "vscode-languageserver-protocol";
import { TextDocument } from "../documents";

export interface ReferenceContext extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {
  document: TextDocument;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}
