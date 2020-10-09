/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import * as vscode from 'vscode';
import * as fs from "fs";
import { DiagnosticsManager, DiagnosticProvider } from "../DiagnosticsManager";
import { SyntaxItem } from "../../../general/include";
import { Errors } from '../DiagnosticsFunctions';

export class FunctionCommandDiagnosticProvider implements DiagnosticProvider {
    //provides diagnostics
    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void{
        let Word = item.Child?.Text;

        if (Word == undefined){
            Errors.Missing('path', 'function', lineIndex, item, collector);
            return;
        }
        
        //check for collection functions
        let filepath = document.uri.fsPath;       
        let index = filepath.indexOf("\\functions\\");
        let folder
    
        if (index > 0) {
            folder = filepath.substring(0, index + 11);
        } else {
            return; 
        }
    
        let pathSpec = Word.text;

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