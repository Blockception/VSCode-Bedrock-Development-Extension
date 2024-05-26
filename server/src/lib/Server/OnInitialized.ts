import { InitializedParams } from "vscode-languageserver";
import { Console } from "../Manager/Console";
import { Traverse } from "../Process/Traverse";
import { SetDynamicEvents } from "./Events/Dynamic";
import { UpdateSettings } from "./Settings/Update";
import { HandleError } from '../Code/Error';

export async function onInitializedAsync(params: InitializedParams): Promise<void> {
  return Promise.resolve(onInitialized(params));
}

function onInitialized(params: InitializedParams): void {
  Console.Log("Initialized minecraft server");

  //Update the settings of the language server
  UpdateSettings();

  //Registers any follow ups
  SetDynamicEvents();

  //For debug purposes use a higher delay version
  setImmediate(() => {
    //Catch error to prevent the server from crashing
    Traverse().catch((err) => HandleError(err));
  });
}
