import { CancellationToken, CodeActionParams, WorkDoneProgressReporter } from 'vscode-languageserver';
import { TextDocument } from '../documents/text-document';

export interface CodeActionContext extends Pick<CodeActionParams, "context" | "range"> {
  document: TextDocument;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}