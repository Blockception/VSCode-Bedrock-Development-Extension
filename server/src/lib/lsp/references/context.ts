import { WorkDoneProgressReporter } from "vscode-languageserver";
import { TextDocument } from "../documents";
import {
  CancellationToken,
  PartialResultParams,
  TextDocumentPositionParams,
  WorkDoneProgressParams,
} from "vscode-languageserver-protocol";

export interface ReferenceContext extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {
  document: TextDocument;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}
