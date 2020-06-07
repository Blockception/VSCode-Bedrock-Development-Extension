import * as vscode from 'vscode';
import * as SC from "./SelectorCompletion";

export function activate(context: vscode.ExtensionContext) {
    console.log("activating completion classes");
	SC.activate(context);
}