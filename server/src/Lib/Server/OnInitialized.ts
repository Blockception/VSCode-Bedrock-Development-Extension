import { InitializedParams, ExecuteCommandRequest } from "vscode-languageserver";
import { Console } from "../Console/Console";
import { AddCommands } from "../Data/Commands/include";
import { AddMinecraftData } from "../Data/include";
import { Manager } from "../Manager/Manager";
import { Traverse } from "../Process/include";
import { SetDynamicEvents } from "./Events/Dynamic";
import { UpdateSettings } from "./Settings";

export async function onInitializedAsync(params: InitializedParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    onInitialized(params);
    resolve();
  });
}

function onInitialized(params: InitializedParams): void {
  Console.Log("Initialized minecraft server");

  //Update the settings of the language server
  UpdateSettings();

  //Registers any follow ups
  SetDynamicEvents();

  //setup commands
  AddCommands();
  AddMinecraftData();

  //For debug purposes use the timeout version
  Traverse();
  //setTimeout(Traverse, 5000);
}
