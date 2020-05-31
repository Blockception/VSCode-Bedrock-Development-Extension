import * as vscode from 'vscode';

export function IsInSelector(document: vscode.TextDocument, position: vscode.Position) : boolean {
    var Line = document.lineAt(position.line);
    var Text = Line.text;

    for (let index = position.character; index > 2; index--) {
        var c = Text.charAt(index);

        switch (c){
            case "]":
                return false;

            case "[":
                
        }
    }

    return false;
}