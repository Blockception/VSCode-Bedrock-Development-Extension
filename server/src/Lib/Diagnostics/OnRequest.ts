import { Pack } from "bc-minecraft-bedrock-project";
import { Fs } from "../Code/Url";
import { Database } from "../Database/include";
import { Console } from "../Manager/include";
import { Manager } from "../Manager/Manager";
import { MinecraftFormat } from "../Minecraft/Format";
import { ForEachDocument } from "../Types/Document/include";
import { TextDocument } from "../Types/Document/TextDocument";

export function ProvideDiagnostics(doc: TextDocument): void {
  if (!Manager.State.DataGathered) return;

  //Send it off to the diagnoser
  Database.Diagnoser.Process(doc);
}

export function ProvidePackDiagnostics(pack: Pack): void {
  Console.Info("diagnosing: " + Fs.GetFilepath(pack.folder));

  ForEachDocument(MinecraftFormat.GetPackFiles(pack), ProvideDiagnostics);
}
