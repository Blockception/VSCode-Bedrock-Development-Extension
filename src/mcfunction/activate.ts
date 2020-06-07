import * as vscode from 'vscode';
import * as McfunctionCompletionItems from './completion_item';
import * as Diagnostics from "./diagnostics"
import * as constants from "../constants"
import * as Formatting from "./formatters"
import * as Symboles from "./SymbolProvider"
import * as Completion from "./completion items/activate"

export function activate(context: vscode.ExtensionContext) {
	console.log("activating mcfunction extension");
	Completion.activate(context)


	//Old redo
	CompletionItems(context);
	Symboles.activate(context);

	Diagnostics.activate(context);
}

function CompletionItems(context: vscode.ExtensionContext) : void {
	// triggered whenever a ' ' is being typed
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(constants.McLanguageIdentifier, new McfunctionCompletionItems.McFunctionCompletion(), " ", "\n", "#" ),
		vscode.languages.registerCompletionItemProvider(constants.McLanguageIdentifier, new Selector.SelectorCompletion(), "@", "a", "e", "r", "p", "s", "[", ",")
	);

	Formatting.activate(context);
}