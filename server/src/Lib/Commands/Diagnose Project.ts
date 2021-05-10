import { ExecuteCommandParams, MessageType, ShowMessageNotification } from "vscode-languageserver";
import { Console } from "../Console/Console";
import { Database } from "../Database/include";
import { DiagnoseContext } from "../Diagnostics/Types/Context";
import { Manager } from "../Manager/Manager";
import { Behavior, World } from "../Types/Minecraft/include";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  Console.Log("Starting on diagnosing project");

  Database.MinecraftProgramData.GetProjecData((data) => {
    let context: DiagnoseContext = {
      projectStructure: data,
    };

    if (Manager.State.TraversingProject || !Manager.State.DataGathered) {
      Manager.Connection.sendNotification(ShowMessageNotification.type, {
        message: "Extension is traversing the project. please wait a couple more seconds.",
        type: MessageType.Info,
      });
      return;
    }

    World.ProvideDiagnostic(context);
    Behavior.ProvideDiagnostic(context);

    Console.Log("Diagnosing done");
  });
}
