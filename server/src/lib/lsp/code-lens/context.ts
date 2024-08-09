import { WorkDoneProgressReporter } from 'vscode-languageserver';
import { CancellationToken } from 'vscode-languageserver-protocol';
import { TextDocument } from '../documents/text-document';

export interface CodeLensContext {
  document: TextDocument;
  token: CancellationToken;
  workDoneProgress: WorkDoneProgressReporter;
}