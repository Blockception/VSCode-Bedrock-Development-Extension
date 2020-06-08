import { DiagnosticsManager } from "../DiagnosticsManager";

import { AlwaysDayDiagnosticProvider } from "./alwaysdayDiagnostics";
import { ClearDiagnosticProvider } from "./clearDiagnostics";
import { CloneDiagnosticProvider } from "./cloneDiagnostics";
import { ConnectDiagnosticProvider } from "./connectDiagnostics";
import { DaylockDiagnosticProvider } from "./DaylockDiagnostics";
import { DeopDiagnosticProvider } from "./deopDiagnostics";
import { DifficultyDiagnosticProvider } from "./difficultyDiagnostics";
import { EffectDiagnosticProvider } from "./effectDiagnostics";
import { FunctionCommandDiagnosticProvider } from "./FunctionDiagnostic";

export function activate(context: DiagnosticsManager) {
    context.set(new AlwaysDayDiagnosticProvider(), ["alwaysday"]);
    context.set(new ClearDiagnosticProvider(), [ "clear" ]);
    context.set(new CloneDiagnosticProvider(), ["clone"]);
    context.set(new ConnectDiagnosticProvider(), ["connect"]);
    context.set(new DaylockDiagnosticProvider(), [ "daylock" ]);
    context.set(new DeopDiagnosticProvider(), [ "deop" ]);
    context.set(new DifficultyDiagnosticProvider(), ["difficulty"]);
    context.set(new EffectDiagnosticProvider(), ["effect"]);
    context.set(new FunctionCommandDiagnosticProvider(), [ "function" ]);    
}
