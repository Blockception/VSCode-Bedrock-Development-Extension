import * as vscode from 'vscode';
import { DiagnosticsManager } from './DiagnosticsManager';

export const Manager = new DiagnosticsManager();
export const collection = vscode.languages.createDiagnosticCollection("mcfunction-diagnostics");