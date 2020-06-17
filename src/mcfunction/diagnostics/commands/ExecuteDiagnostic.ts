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

import * as vscode from "vscode";
import { DiagnosticsManager, DiagnosticProvider } from "../DiagnosticsManager";
import { SyntaxItem, RangedWord } from "../../../general/include";
import { Functions, Errors } from "../DiagnosticsFunctions";
import { doesNotReject } from "assert";

export function activate(context: DiagnosticsManager) {    
    context.set(new ExecuteDiagnosticProvider(), [ "execute" ]);
}

export class ExecuteDiagnosticProvider implements DiagnosticProvider {
    provideDiagnostic(item: SyntaxItem, lineIndex : number, collector : vscode.Diagnostic[], dm : DiagnosticsManager, document: vscode.TextDocument) : void{
        var Selector = item.Child;

        if (Selector == undefined)
            return;

        if (!Selector?.IsString()){
            dm.SelectorDiagnoser?.provideDiagnostic(Selector, lineIndex, collector, dm, document);
        }

        //X Coordinate
        var XCoord = Selector.Child;
        var Parent : SyntaxItem;
        if (XCoord == undefined) {
            Errors.Missing('coordinate', 'execute', lineIndex, Selector, collector);
            return;
        }

        if (XCoord.Text.text != "~~~") {
            //X coordinate
            dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);
            
            //Y Coordinate
            var YCoord = XCoord.Child;
            if (YCoord == undefined) {
                Errors.Missing('coordinate', 'execute', lineIndex, XCoord, collector);
                return;
            }

            dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);

            //Z Coordinate
            var ZCoord = YCoord.Child;
            if (ZCoord == undefined) {
                Errors.Missing('coordinate', 'execute', lineIndex, YCoord, collector);
                return;
            }

            dm.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);
            Parent = ZCoord;
        }
        else {
            Parent = XCoord;
        }

        //detect or a command
        var Next = Parent.Child;

        if (Next == undefined){
            Errors.Missing('command | detect', 'execute', lineIndex, Parent, collector);
            return;
        }

        //if next is detect
        if (Next.Text.text == "detect"){
            var XCoord = Next.Child;

            if (XCoord == undefined) {
                Errors.Missing('coordinate', 'execute', lineIndex, Next, collector);
                return;
            }

            if (XCoord.Text.text != "~~~") {
                //X coordinate
                dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);
                
                //Y Coordinate
                var YCoord = XCoord.Child;
                if (YCoord == undefined) {
                    Errors.Missing('coordinate', 'execute', lineIndex, XCoord, collector);
                    return;
                }
    
                dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);
    
                //Z Coordinate
                var ZCoord = YCoord.Child;
                if (ZCoord == undefined) {
                    Errors.Missing('coordinate', 'execute', lineIndex, YCoord, collector);
                    return;
                }
    
                dm.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);
                Parent = ZCoord;
            }
            else {
                Parent = XCoord;
            }

            //block
            var Block = Parent.Child;

            if (Block == undefined){
                Errors.Missing('block', 'execute', lineIndex, Parent, collector);
                return;
            }

            dm.BlockDiagnoser?.provideDiagnostic(Block, lineIndex, collector, dm, document);

            //Data
            var Data = Block.Child;

            if (Data == undefined){
                Errors.Missing('block', 'execute', lineIndex, Block, collector);
                return;
            }

            dm.IntegerDiagnoser?.provideDiagnostic(Data, lineIndex, collector, dm, document);

            Next = Data.Child;
        }

        //Command
        if (Next != undefined){
            var Diagnoser = dm.get(Next);

            if (Diagnoser != undefined) {
                Diagnoser.provideDiagnostic(Next, lineIndex, collector, dm, document);
            }
            else {
                collector.push(new vscode.Diagnostic(
                    Next.Text.ToRange(lineIndex),
                    "Unexpected command",
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        }
        return;
    }
}
