import { InitializedParams } from "vscode-languageserver";
import { Console } from "../Console/Console";
import { CreateDiagnoser } from "../Diagnostics/Diagnoser";
import { Manager } from "../Manager/Manager";
import { Traverse } from "../Process/Traverse";
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

  //Setup the diagnoser
  Manager.Diagnoser = CreateDiagnoser();

  //Update the settings of the language server
  UpdateSettings();

  //Registers any follow ups
  SetDynamicEvents();

  //For debug purposes use the timeout version
  Traverse();
  //setTimeout(Traverse, 5000);
}
