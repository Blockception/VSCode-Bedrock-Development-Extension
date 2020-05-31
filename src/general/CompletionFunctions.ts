import * as vscode from 'vscode';

export function createCompletionItem(code: string, label: string, description: string) : vscode.CompletionItem {
    let Item = new vscode.CompletionItem(label);
    Item.insertText = code;
    Item.detail = description;
    Item.documentation = description;
    Item.kind = vscode.CompletionItemKind.Keyword;

    return Item;
}