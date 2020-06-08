import * as vscode from 'vscode';
import * as mcfunction from './mcfunction/activate';
import * as language from './language/diagnostic';

export function activate(context: vscode.ExtensionContext) {
	mcfunction.activate(context); //Add mcfunction
	language.activate(context);
}