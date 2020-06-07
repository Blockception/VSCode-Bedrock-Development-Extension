import { DiagnosticsManager } from "../DiagnosticsManager";

import { AlwaysDayDiagnosticProvider } from "./alwaysdayDiagnostics";
import { ClearDiagnosticProvider } from "./clearDiagnostics";
import { DaylockDiagnosticProvider } from "./DaylockDiagnostics";
import { FunctionCommandDiagnosticProvider } from "./FunctionDiagnostic";

export function activate(context: DiagnosticsManager) {    
    context.set(new AlwaysDayDiagnosticProvider(), ["alwaysday"]);
    context.set(new ClearDiagnosticProvider(), [ "clear" ]);
    context.set(new DaylockDiagnosticProvider(), [ "daylock" ]);
    context.set(new FunctionCommandDiagnosticProvider(), [ "function" ]);
    
}
