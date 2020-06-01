import * as vscode from 'vscode';
import * as fs from "fs";
import { cpus } from 'os';

export function provideDiagnostics(line: vscode.TextLine, document: vscode.TextDocument, collection: vscode.Diagnostic[]) : void {
    var filepath = document.uri.fsPath;
    var index = filepath.indexOf("\\functions\\");
    var folder

    if (index > 0) {
        folder = filepath.substring(0, index + 11);
    } else{ 
        return; 
    }
    
    var text = line.text;
    var startindex = text.indexOf("function ");

    if (startindex < 0)
        return;

    startindex += 9
    var endindex = startindex;
   
    for (endindex = startindex; endindex < text.length; endindex++){
        var C = text.charAt(endindex); 
        if (C == " " || C == "\t" || C == "#" || C == "-"){
            break;
        }
    }

    var pathSpec = text.substring(startindex, endindex)
    if (pathSpec == "")
        return;

    filepath = folder + pathSpec.replace("/", "\\") + ".mcfunction";

    if (!fs.existsSync(filepath)){
        collection.push(new vscode.Diagnostic(
            new vscode.Range(line.lineNumber, startindex, line.lineNumber, endindex),
            "function: couldn't find the file: " + filepath,
            vscode.DiagnosticSeverity.Error
        ));
    }
}