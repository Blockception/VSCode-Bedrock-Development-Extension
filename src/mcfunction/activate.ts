import * as vscode from 'vscode';
import * as Completion from "./completion items/activate"
import * as Diagnostics from "./diagnostics/activate"

export function activate(context: vscode.ExtensionContext) {
	console.log("activating mcfunction extension");
	Completion.activate(context)
	Diagnostics.activate(context);
}