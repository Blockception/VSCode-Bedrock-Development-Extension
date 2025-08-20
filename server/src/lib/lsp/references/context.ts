import {
  CancellationToken,
  PartialResultParams,
  TextDocumentPositionParams,
  WorkDoneProgressParams, WorkDoneProgressReporter
} from "vscode-languageserver";
import { TextDocument } from "../documents";

export interface ReferenceContext extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {
  document: TextDocument;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}
