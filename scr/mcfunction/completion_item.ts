import * as vscode from 'vscode';

class McFunctionCompletion implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        var Line = document.lineAt(position);
        var Text = Line.text;

        if (Line.isEmptyOrWhitespace)
            return null;

        if (Text.substr(0, 1) == "#")
            return null;

        return [
            new vscode.CompletionItem("scoreboard", vscode.CompletionItemKind.Keyword)
        ];
    }
}