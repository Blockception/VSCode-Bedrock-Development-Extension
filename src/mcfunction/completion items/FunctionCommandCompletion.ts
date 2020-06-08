import * as vscode from "vscode";
import * as fs from "fs";
import * as constants from "../../constants";

export function activate(context: vscode.ExtensionContext) {    
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(constants.McLanguageIdentifier, new FunctionCommandCompletionProvider(), " ")
    );
}

class FunctionCommandCompletionProvider implements vscode.CompletionItemProvider {

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        var receiver = new vscode.CompletionList();

        if (position.character < 9){
            return receiver;
        }

        var text = document.lineAt(position.line).text;

        if (text.substring(position.character - 9, position.character).trim() != "function")
            return;

        var filepath = document.uri.fsPath;
        var index = filepath.indexOf("\\functions\\");
    
        if (index > 0) {
            var folder = filepath.substring(0, index + 11);
    
            this.explore(folder, folder, receiver);
        }

        return receiver;
    }

    explore(baseFolder : string, currentFolder : string, receiver : vscode.CompletionList){
        var files = fs.readdirSync(currentFolder);
        var Directories = new Array<string>();

        for (let index = 0; index < files.length; index++) {
            var file = currentFolder + files[index];
            
            if (fs.lstatSync(file).isDirectory()){
                Directories.push(file + "\\");
            }
            else{
                file = file;
                receiver.items.push(new vscode.CompletionItem(file.replace(baseFolder, "").replace(".mcfunction", "").replace("\\", "/")));
            }
        }

        Directories.forEach(x => this.explore(baseFolder, x, receiver));
    }
}