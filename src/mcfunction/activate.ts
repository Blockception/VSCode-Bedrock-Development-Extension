import * as vscode from 'vscode';
import * as Completion from "./completion items/activate"
import * as LanguageDiagnostics from "./diagnostics/activate"
import * as Formatter from './Formatter'

export function activate(context: vscode.ExtensionContext) {
	console.log("activating mcfunction extension");
	Completion.activate(context)
	LanguageDiagnostics.activate(context);
	Formatter.activate(context);
}