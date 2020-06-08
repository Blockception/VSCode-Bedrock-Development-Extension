import * as vscode from 'vscode';
import * as fs from "fs";
import { DiagnosticsManager, DiagnosticProvider } from "../DiagnosticsManager";
import { SyntaxItem } from "../../../general/include";
import { Errors } from '../DiagnosticsFunctions';

export class FunctionCommandDiagnosticProvider implements DiagnosticProvider {
    //provides diagnostics
    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void{
        var Word = item.Child?.Text;

        if (Word == undefined){
            Errors.Missing('path', 'function', lineIndex, item, collector);
            return;
        }
        
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