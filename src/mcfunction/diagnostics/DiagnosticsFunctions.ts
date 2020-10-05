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
import { SyntaxItem } from '../../general/include';
import { DiagnosticsManager } from './DiagnosticsManager';

export module Errors {

    export function Missing(type : string, command : string, lineIndex : number, parent : SyntaxItem, collector: vscode.Diagnostic[]) : void {
        collector.push(new vscode.Diagnostic(
            new vscode.Range(lineIndex, parent.Text.endindex + 1, lineIndex, parent.Text.endindex + 2),
            `Missing a '${type}' for the '${command}' command`,
            vscode.DiagnosticSeverity.Error
        ));
    }

    export function UnknownWords(AcceptValues : string, lineIndex : number, item : SyntaxItem, collector: vscode.Diagnostic[]) : void {
        collector.push(new vscode.Diagnostic(
            new vscode.Range(lineIndex, item.Text.startindex, lineIndex, item.Text.endindex),
            `Unknown value: '${item.Text.text}', accepted values are: '${AcceptValues}'`,
            vscode.DiagnosticSeverity.Error
        ));
    }

}

export module Functions {

    export function provideDiagnosticsXYZ(command : string, item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : [SyntaxItem, boolean] {
        let item_x = item.Child;

        //x
		if (item_x == undefined) {
			Errors.Missing('coordinate', command, lineIndex, item, collector);
			return [item, false];
        }

        if (item_x.Text.text == "~~~") {
            return [item_x, true];
        }

        dm.CoordinateDiagnoser?.provideDiagnostic(item_x, lineIndex, collector, dm, document);

		let item_y = item_x.Child;

		//y
		if (item_y == undefined) {
			Errors.Missing('coordinate', command, lineIndex, item_x, collector);
			return [item_x, false];
        }
        dm.CoordinateDiagnoser?.provideDiagnostic(item_x, lineIndex, collector, dm, document);

		let item_z = item_y.Child;

		//z
		if (item_z == undefined) {
			Errors.Missing('coordinate', command, lineIndex, item_y, collector);
			return [item_y, false];
        }
        dm.CoordinateDiagnoser?.provideDiagnostic(item_x, lineIndex, collector, dm, document);

        return [item_z, true];
    }
}
