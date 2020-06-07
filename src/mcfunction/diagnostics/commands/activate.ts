import { DiagnosticsManager } from "../DiagnosticsManager";
import { FunctionCommandDiagnosticProvider } from "./FunctionDiagnostic";
import { AlwaysDayDiagnosticProvider } from "./alwaysdayDiagnostics";

export function activate(context: DiagnosticsManager) {    
    context.set(new AlwaysDayDiagnosticProvider(), ["alwaysday"]);
    context.set(new FunctionCommandDiagnosticProvider(), [ "function" ]);    
}
