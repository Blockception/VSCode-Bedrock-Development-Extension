import * as vscode from 'vscode';
import * as McfunctionCompletionItems from './completion_item';
import * as Selector from "./selectors/completion_item"
import * as Diagnostics from "./diagnostics"
import * as Test from "./selectors/selector"
import * as constants from "./constants"

export function activate(context: vscode.ExtensionContext) {
	CompletionItems(context);
	Hovers(context);

	Diagnostics.activate(context);
}

function CompletionItems(context: vscode.ExtensionContext) : void {
	// triggered whenever a ' ' is being typed
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		constants.McLanguageIdentifier, 
		new McfunctionCompletionItems.McFunctionCompletion(), 
		" ", "\n" ));

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		constants.McLanguageIdentifier, 
			new Selector.SelectorCompletion(), 
			"@", "a", "e", "r", "p", "s", "[", ","));
}

function Hovers(context: vscode.ExtensionContext) : void {
	//vscode.languages.registerHoverProvider(McFunctionName, )
}