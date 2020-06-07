import * as vscode from "vscode";
import * as constants from "../../constants";

export function activate(context: vscode.ExtensionContext) {    
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(constants.McLanguageIdentifier, new RegionCompletionProvider(), "#")
    );
}

class RegionCompletionProvider implements vscode.CompletionItemProvider {

    Default : vscode.CompletionList;

    constructor() {
        this.Default = new vscode.CompletionList();
        var Item = new vscode.CompletionItem("region", vscode.CompletionItemKind.Snippet);
        Item.label = "region";
        Item.documentation = "creates a new foldable region inside your code";
        Item.insertText = new vscode.SnippetString("region\n\n#endregion");

        this.Default.items.push(Item);
        this.Default.isIncomplete = false;
    }

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        if (position.character < 2){
            return this.Default;
        }
    }
}