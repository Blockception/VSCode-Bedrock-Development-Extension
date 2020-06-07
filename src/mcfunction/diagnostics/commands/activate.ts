import { DiagnosticsManager } from "../DiagnosticsManager";
import { FunctionCommandDiagnosticProvider } from "./FunctionDiagnostic";

export function activate(context: DiagnosticsManager) {
    
    context.set(new FunctionCommandDiagnosticProvider(), [ "function" ]);
}
