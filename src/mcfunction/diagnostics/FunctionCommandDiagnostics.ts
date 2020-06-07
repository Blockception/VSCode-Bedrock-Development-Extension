import * as vscode from 'vscode';
import * as fs from "fs";
import { DiagnosticsManager, DiagnosticProvider } from "../diagnostics/DiagnosticsManager";
import { SyntaxItem } from "../../general/include";

export function activate(context: DiagnosticsManager) {    
    context.set(new FunctionCommandDiagnosticProvider(), [ "function" ]);
}

class FunctionCommandDiagnosticProvider implements DiagnosticProvider {
    //provides diagnostics
    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void{
        var Word = item.Child?.Text;

        if (Word == undefined)
            return;
        
        //check for collection functions
        var filepath = document.uri.fsPath;       
        var index = filepath.indexOf("\\functions\\");
        var folder
    
        if (index > 0) {
            folder = filepath.substring(0, index + 11);
        } else {
            return; 
        }
    
        var pathSpec = Word.text;

        if (pathSpec == "")
            return;
    
        filepath = folder + pathSpec.replace("/", "\\") + ".mcfunction";
    
        if (!fs.existsSync(filepath)){
            collector.push(new vscode.Diagnostic(
                new vscode.Range(lineIndex, Word.startindex, lineIndex, Word.endindex),
                "function: couldn't find the file: " + filepath,
                vscode.DiagnosticSeverity.Error
            ));
        }
    }
}