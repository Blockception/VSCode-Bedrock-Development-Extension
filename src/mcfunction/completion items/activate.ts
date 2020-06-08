import * as vscode from 'vscode';
import * as SC from "./SelectorCompletion";
import * as RC from "./RegionCompletion";
import * as FCC from "./FunctionCommandCompletion";

export function activate(context: vscode.ExtensionContext) {
    console.log("activating completion classes");
    SC.activate(context);
    RC.activate(context);
    FCC.activate(context);
}