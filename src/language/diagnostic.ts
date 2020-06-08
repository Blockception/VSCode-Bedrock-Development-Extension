import * as vscode from 'vscode';

export const collection = vscode.languages.createDiagnosticCollection("language-diagnostics");

export function activate(context: vscode.ExtensionContext) {
    console.log("activating language diagnostics");
    
    //If window is open, create new diagnostics
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, collection);
    }

    //Register events
	context.subscriptions.push(
        //update
        vscode.workspace.onDidChangeTextDocument(e =>{
            updateDiagnostics(e.document, collection)
        }),
        //when window is changed
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                updateDiagnostics(editor.document, collection);
            }
        })
    );
}

//Updates the content of the collection of diagnostis for the specified document
function updateDiagnostics(document : vscode.TextDocument, collection : vscode.DiagnosticCollection){
    if (!document.uri.fsPath.endsWith(".lang"))
        return;

    console.log("running diagnostics start:\t" + document.fileName);

    var docCollection = new Array<vscode.Diagnostic>();
    var Keys = new Map<string, vscode.Range>();

    for (var lineIndex = 0; lineIndex < document.lineCount; lineIndex++){
        var line = document.lineAt(lineIndex);
        var text = line.text.trim();

        if (text === "" || text.startsWith("##"))
            continue;

        var index = text.indexOf("=");

        if (index < 0){
            docCollection.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, 0, lineIndex, line.text.length),
                "Not a propery language text, either comment the line or add a key",
                vscode.DiagnosticSeverity.Error
            ));
        }
        else {
            var key = text.substring(0, index);

            if (Keys.has(key)){
                var Item = Keys.get(key);

                if (Item != undefined) {
                    docCollection.push(new vscode.Diagnostic(
                        Item,
                        "has a duplicate at line: " + (lineIndex + 1),
                        vscode.DiagnosticSeverity.Error),
                        new vscode.Diagnostic(
                        new vscode.Range(lineIndex, 0, lineIndex, index),
                        "has a duplicate at line: " + (Item.start.line + 1),
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }
            else{
                Keys.set(key, new vscode.Range(lineIndex, 0, lineIndex, index));
            }
        }
    }

    collection.set(document.uri, docCollection);
    console.log("running diagnostics done:\t" + document.fileName);
}