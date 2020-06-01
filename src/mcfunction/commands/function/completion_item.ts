import * as vscode from "vscode";
import * as fs from "fs";

export function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext, receiver : vscode.CompletionList) : void {
    var filepath = document.uri.fsPath;
    var index = filepath.indexOf("\\functions\\");

    if (index > 0) {
        var folder = filepath.substring(0, index + 11);

        explore(folder, folder, receiver);
    }
}

function explore(baseFolder : string, currentFolder : string, receiver : vscode.CompletionList){
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

    Directories.forEach(x => explore(baseFolder, x, receiver));
}