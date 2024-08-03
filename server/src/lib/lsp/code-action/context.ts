import { WorkDoneProgressReporter } from 'vscode-languageserver';
import { CancellationToken, CodeActionParams } from 'vscode-languageserver-protocol';
import { TextDocument } from '../documents/text-document';

export interface CodeActionContext extends Pick<CodeActionParams, "context" | "range"> {
  document: TextDocument;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}