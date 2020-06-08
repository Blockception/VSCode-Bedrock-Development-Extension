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
            Errors.Missing('coordinate', 'execute <target>', lineIndex, Selector, collector);
            return;
        }

        if (XCoord.Text.text != "~~~") {
            //X coordinate
            dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);
            
            //Y Coordinate
            var YCoord = XCoord.Child;
            if (YCoord == undefined) {
                Errors.Missing('coordinate', 'execute <target> <x>', lineIndex, XCoord, collector);
                return;
            }

            dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);

            //Z Coordinate
            var ZCoord = YCoord.Child;
            if (ZCoord == undefined) {
                Errors.Missing('coordinate', 'execute <target> <x y>', lineIndex, YCoord, collector);
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
            Errors.Missing('command | detect', 'execute <target> <x y z>', lineIndex, Parent, collector);
            return;
        }

        //if next is detect
        if (Next.Text.text == "detect"){
            var XCoord = Next.Child;

            if (XCoord == undefined) {
                Errors.Missing('coordinate', 'execute <target> <x y z> detect', lineIndex, Selector, collector);
                return;
            }

            if (XCoord.Text.text != "~~~") {
                //X coordinate
                dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);
                
                //Y Coordinate
                var YCoord = XCoord.Child;
                if (YCoord == undefined) {
                    Errors.Missing('coordinate', 'execute <target> <x y z> detect <x>', lineIndex, XCoord, collector);
                    return;
                }
    
                dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);
    
                //Z Coordinate
                var ZCoord = YCoord.Child;
                if (ZCoord == undefined) {
                    Errors.Missing('coordinate', 'execute <target> <x y z> detect <x y>', lineIndex, YCoord, collector);
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
                Errors.Missing('block', 'execute <target> <x y z> detect <x y z>', lineIndex, Parent, collector);
                return;
            }

            dm.BlockDiagnoser?.provideDiagnostic(Block, lineIndex, collector, dm, document);

            //Data
            var Data = Block.Child;

            if (Data == undefined){
                Errors.Missing('block', 'execute <target> <x y z> detect <x y z>', lineIndex, Block, collector);
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
        }
        return;
    }
}
