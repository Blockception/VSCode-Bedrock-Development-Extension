'use strict';
import * as vscode from 'vscode';
import * as path from 'path';
import * as Words from '../general/Words'
import * as Selector from "./selectors/selector"
import * as SelectorDiag from "./selectors/diagnostics"


export function activate(context: vscode.ExtensionContext) {
    const collection = vscode.languages.createDiagnosticCollection("debugs");
    
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, collection);
    }

    //update
	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => updateDiagnostics(e.document, collection))
    );
    
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                updateDiagnostics(editor.document, collection);
            }
        })
    );

    //delete if closed
	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(doc => collection.delete(doc.uri))
	);
}

export function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    var diags = new Array<vscode.Diagnostic>();

	if (document && path.extname(document.uri.fsPath) === '.mcfunction') {
        for (var index = 0; index < document.lineCount; index++){
            CheckLine(document.lineAt(index), document, diags);
        }

        collection.set(document.uri, diags);
	} else {
		collection.clear();
	}
}

export function CheckLine(line: vscode.TextLine, document: vscode.TextDocument, collection: vscode.Diagnostic[]) : void {
    var words = Words.RangedWord.GetWords(line.text);    

    for (let index = 0; index < words.length; index++) {
        var w = words[index];
        
        if (Selector.IsSelector(w.text)){
            SelectorDiag.CheckSelector(line, w, document, collection);
        }
        else
        {
            
        }
    }
}