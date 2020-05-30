import * as vscode from 'vscode';
import * as mcfunction from './mcfunction/mcfunction';

export function activate(context: vscode.ExtensionContext) {
	mcfunction.activate(context); //Add mcfunction
}