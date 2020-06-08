import { DiagnosticsManager } from "../DiagnosticsManager";

import { AlwaysDayDiagnosticProvider } from "./AlwaysdayDiagnostics";
import { ClearDiagnosticProvider } from "./ClearDiagnostics";
import { CloneDiagnosticProvider } from "./CloneDiagnostics";
import { ConnectDiagnosticProvider } from "./ConnectDiagnostics";
import { DaylockDiagnosticProvider } from "./DaylockDiagnostics";
import { DeopDiagnosticProvider } from "./DeopDiagnostics";
import { DifficultyDiagnosticProvider } from "./DifficultyDiagnostics";
import { EffectDiagnosticProvider } from "./EffectDiagnostics";
import { EnchantDiagnosticProvider } from "./EnchantDiagnostics";
import { ExecuteDiagnosticProvider } from "./ExecuteDiagnostic";
import { FillDiagnosticProvider } from "./FillDiagnostics";
import { FunctionCommandDiagnosticProvider } from "./FunctionDiagnostic";
import { GamemodeDiagnosticProvider } from "./GamemodeDiagnostics";
import { GameruleDiagnosticProvider } from "./GameruleDiagnostics";

export function activate(context: DiagnosticsManager) {
    context.set(new AlwaysDayDiagnosticProvider(), ["alwaysday"]);
    context.set(new ClearDiagnosticProvider(), [ "clear" ]);
    context.set(new CloneDiagnosticProvider(), ["clone"]);
    context.set(new ConnectDiagnosticProvider(), ["connect"]);
    context.set(new DaylockDiagnosticProvider(), [ "daylock" ]);
    context.set(new DeopDiagnosticProvider(), [ "deop" ]);
    context.set(new DifficultyDiagnosticProvider(), ["difficulty"]);
    context.set(new EffectDiagnosticProvider(), ["effect"]);
    context.set(new EnchantDiagnosticProvider(), ["effect"]);
    context.set(new ExecuteDiagnosticProvider(), ["execute"]);
    context.set(new FillDiagnosticProvider(), ["fill"]);
    context.set(new FunctionCommandDiagnosticProvider(), [ "function" ]);
    context.set(new GamemodeDiagnosticProvider(), [ "gamemode" ]);
    context.set(new GameruleDiagnosticProvider(), [ "gamerule" ]);
}
