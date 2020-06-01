import * as vscode from 'vscode';
import * as McfunctionCompletionItems from './completion_item';
import * as Selector from "./selectors/completion_item"
import * as Diagnostics from "./diagnostics"
import * as constants from "./constants"
import * as Formatting from "./formatters"

export function activate(context: vscode.ExtensionContext) {
	CompletionItems(context);
	Hovers(context);
	Formatters(context);

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

function Formatters(context: vscode.ExtensionContext) : void {
	//Code formatting
	Formatting.activate(context);
}