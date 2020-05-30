import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider = vscode.languages.registerCompletionItemProvider(
		'bc-minecraft-mcfunction',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				

			}
		},
		" " // triggered whenever a '.' is being typed
	);

    context.subscriptions.push(provider);
}