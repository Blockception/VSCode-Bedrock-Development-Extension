import * as vscode from "vscode";
import { DiagnosticsManager, DiagnosticProvider } from "../DiagnosticsManager";
import { SyntaxItem, RangedWord } from "../../../general/include";

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
        var Coord = Selector.Child;
        if (Coord == undefined)
            return;

        if (Coord.Text.text != "~~~") {
            //X coordinate
            dm.CoordinateDiagnoser?.provideDiagnostic(Coord, lineIndex, collector, dm, document);
            
            //Y Coordinate
            Coord = Coord.Child;
            if (Coord == undefined)
                return;

            dm.CoordinateDiagnoser?.provideDiagnostic(Coord, lineIndex, collector, dm, document);

            //Z Coordinate
            Coord = Coord.Child;
            if (Coord == undefined)
                return;

            dm.CoordinateDiagnoser?.provideDiagnostic(Coord, lineIndex, collector, dm, document);
        }

        var Next = Coord.Child;

        if (Next == undefined)
            return;

        if (Next.Text.text == "detect"){
            Coord = Next.Child;
            if (Coord == undefined)
                return;

            //X coordinate
            dm.CoordinateDiagnoser?.provideDiagnostic(Coord, lineIndex, collector, dm, document);
            
            //Y Coordinate
            Coord = Selector.Child;
            if (Coord == undefined)
                return;

            dm.CoordinateDiagnoser?.provideDiagnostic(Coord, lineIndex, collector, dm, document);

            //Z Coordinate
            Coord = Selector.Child;
            if (Coord == undefined)
                return;

            dm.CoordinateDiagnoser?.provideDiagnostic(Coord, lineIndex, collector, dm, document);

            //block, data, command
            Next = Coord.Child?.Child?.Child;
        }

        if (Next != undefined){
            var Diagnoser = dm.get(Next);

            if (Diagnoser != undefined) {
                Diagnoser.provideDiagnostic(Next, lineIndex, collector, dm, document);
            }
        }
        return;
    }
}
