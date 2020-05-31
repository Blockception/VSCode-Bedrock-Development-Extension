import * as vscode from 'vscode';
import * as CompletionFunction from "../CompletionFunctions"

export function CompletionItems(Words : string[], receiver: vscode.CompletionList) : void {
    //Just typed scoreboard
    if (Words.length <= 1){
        receiver.items.push(CompletionFunction.createCompletionItem("objectives", "objectives", "The handling of objectives for minecraft"));
        receiver.items.push(CompletionFunction.createCompletionItem("players", "players", "The handling of players, and operations for minecraft"));
        return;
    }

    switch(Words[1]){
        case "objectives":
            receiver.items.push(CompletionFunction.createCompletionItem("add", "add", "Adds"));
            receiver.items.push(CompletionFunction.createCompletionItem("remove", "remove", ""));
            receiver.items.push(CompletionFunction.createCompletionItem("list", "list", ""));
            receiver.items.push(CompletionFunction.createCompletionItem("setdisplay", "setdisplay", ""));
            break;

        case "players":
            receiver.items.push(CompletionFunction.createCompletionItem("objectives", "objectives", "The handling of objectives for minecraft"));
            receiver.items.push(CompletionFunction.createCompletionItem("players", "players", "The handling of players, and operations for minecraft"));
            break;
    }
}