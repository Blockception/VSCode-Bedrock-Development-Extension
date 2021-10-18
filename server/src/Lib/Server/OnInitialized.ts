import { InitializedParams } from "vscode-languageserver";
import { Console } from "../Manager/Console";
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

  //Update the settings of the language server
  UpdateSettings();

  //Registers any follow ups
  SetDynamicEvents();

  //For debug purposes use the timeout version
  Traverse();
  //setTimeout(Traverse, 5000);
}
