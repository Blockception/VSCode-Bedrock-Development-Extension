import * as vscode from "vscode";
import * as fs from "fs";
import * as constants from "../../constants";


class FunctionCommandCompletionProvider implements DiagnosticProvider {

    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void {
        



        var receiver = new vscode.CompletionList();
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