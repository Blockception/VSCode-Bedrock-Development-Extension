import * as vscode from 'vscode';
import * as McfunctionCompletionItems from './completion_item';

export function activate(context: vscode.ExtensionContext) {
	// triggered whenever a ' ' is being typed
	const CompletionProvider = vscode.languages.registerCompletionItemProvider(
		'bc-minecraft-mcfunction', 
		new McfunctionCompletionItems.McFunctionCompletion(), 
		" ", "\n" );

	context.subscriptions.push(CompletionProvider);
}