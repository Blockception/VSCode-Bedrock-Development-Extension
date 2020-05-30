import * as vscode from 'vscode';
import * as McfunctionCompletionItems from './completion_item';

export function activate(context: vscode.ExtensionContext) {

	const provider = vscode.languages.registerCompletionItemProvider(
		'bc-minecraft-mcfunction',
		new McfunctionCompletionItems.McFunctionCompletion(),
		" " // triggered whenever a ' ' is being typed
	);

    context.subscriptions.push(provider);
}