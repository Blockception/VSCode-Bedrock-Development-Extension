import * as vscode from 'vscode';
import * as McfunctionCompletionItems from './completion_item';
import * as Selector from "./selectors/completion_item"

export function activate(context: vscode.ExtensionContext) {
	// triggered whenever a ' ' is being typed
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		'bc-minecraft-mcfunction', 
		new McfunctionCompletionItems.McFunctionCompletion(), 
		" ", "\n" ));

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
			'bc-minecraft-mcfunction', 
			new Selector.SelectorCompletion(), 
			"@", "a", "e", "r", "p", "s", "[", ","));
}