import * as vscode from "vscode";
import * as constants from "./constants";

export function activate(context: vscode.ExtensionContext): void {

    //register command
    vscode.commands.registerCommand("blockception.mcfunction.formatter", () => {
        const { activeTextEditor } = vscode.window;

        if (activeTextEditor && activeTextEditor.document.languageId === "foo-lang") {
            const { document } = activeTextEditor;

            return format(document);
        }
    });

    //formatter
    vscode.languages.registerDocumentFormattingEditProvider(constants.McLanguageIdentifier, {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            return format(document);
        },
    });
}

function format(document: vscode.TextDocument): vscode.TextEdit[] {
    var collection = new Array<vscode.TextEdit>();

    for (let index = 0; index < document.lineCount; index++) {
        formatline(index, document, collection);        
    } 

    return collection;
}

function formatline(index : number, document: vscode.TextDocument, collection: vscode.TextEdit[]) {
    var line = document.lineAt(index);
    var text = line.text;

    if (text == "")
        return;

    var startindex = 0;
    var c = text.charAt(startindex);

    while (c == " " || c == "/" || c == "\t") {
        startindex++;
        c = text.charAt(startindex);
    }

    if (startindex > 0){
        collection.push(new vscode.TextEdit(new vscode.Range(index, 0, index, startindex), ""));
    }

    var endindex = text.length;
    startindex = endindex;
    c = text.charAt(startindex);

    while (c == " " || c == "\t" || c == ""){
        startindex--;
        c = text.charAt(startindex);
    }

    startindex++;

    if (startindex < endindex) {
        collection.push(new vscode.TextEdit(new vscode.Range(index, startindex, index, endindex), ""));
    }

    
}
