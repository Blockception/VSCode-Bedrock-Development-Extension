import * as vscode from "vscode";
import * as constants from "../constants";
import * as Functions from "../general/include"

export function activate(context: vscode.ExtensionContext): void {

    //register command
    vscode.commands.registerCommand("blockception.mcfunction.formatter", () => {
        const { activeTextEditor } = vscode.window;

        if (activeTextEditor && activeTextEditor.document.languageId === "foo-lang") {
            const { document } = activeTextEditor;

            return format(document);
        }
    });

    //formatter for whole document
    vscode.languages.registerDocumentFormattingEditProvider(constants.McLanguageIdentifier, {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            return format(document);
        }
    });

    //formatter for ranged document
    vscode.languages.registerDocumentRangeFormattingEditProvider(constants.McLanguageIdentifier, {
        provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token : vscode.CancellationToken) 
        : vscode.ProviderResult<vscode.TextEdit[]> {
            var collection = new Array<vscode.TextEdit>();

            for (let index = range.start.line; index < range.end.line; index++) {
                formatline(index, document, collection);        
            } 

            return collection;
        }
    });

}

//formatts the whole document
function format(document: vscode.TextDocument): vscode.TextEdit[] {
    var collection = new Array<vscode.TextEdit>();

    for (let index = 0; index < document.lineCount; index++) {
        var Line = document.lineAt(index);
        var Text = Line.text;
    
        if (Text.length > 2){
            Functions.TextEdits.TrimStartFromLine(Line, collection, ["", "/", " ", "\t"])
            Functions.TextEdits.TrimEndFromLine(Line, collection, ["", " ", "\t"])
    
            Functions.TextEdits.ReplaceTextFromLine("~+", "~", Line, collection);
            Functions.TextEdits.ReplaceTextFromLine("~0", "~", Line, collection);
            Functions.TextEdits.ReplaceTextFromLine("^+", "^", Line, collection);
            Functions.TextEdits.ReplaceTextFromLine("^0", "^", Line, collection);
        }    
    } 

    return collection;
}

//formatts the specified line
function formatline(index : number, document: vscode.TextDocument, collection: vscode.TextEdit[]) {
    var Line = document.lineAt(index);
    var Text = Line.text

    if (Text.length > 2){
        Functions.TextEdits.TrimStartFromLine(Line, collection, ["", "/", " ", "\t"])
        Functions.TextEdits.TrimEndFromLine(Line, collection, ["", " ", "\t"])

        Functions.TextEdits.ReplaceTextFromLine("~+", "~", Line, collection);
        Functions.TextEdits.ReplaceTextFromLine("~0", "~", Line, collection);
        Functions.TextEdits.ReplaceTextFromLine("^+", "^", Line, collection);
        Functions.TextEdits.ReplaceTextFromLine("^0", "^", Line, collection);
    }
}
