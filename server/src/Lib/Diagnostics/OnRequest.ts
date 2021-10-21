import { Pack } from "bc-minecraft-bedrock-project";
import { Fs } from "../Code/Url";
import { Database } from "../Database/include";
import { Console } from "../Manager/include";
import { Manager } from "../Manager/Manager";
import { MinecraftFormat } from "../Minecraft/Format";
import { ForEachDocument } from '../Types/Document/Document';
import { TextDocument } from "../Types/Document/TextDocument";
import { ProgressBar } from '../Types/Progress/ProgressBar';

export function ProvideDiagnostics(doc: TextDocument): void {
  if (!Manager.State.DataGathered) return;

  //Send it off to the diagnoser
  Database.Diagnoser.Process(doc);
}

export function ProvidePackDiagnostics(pack: Pack, reporter? : ProgressBar): void {
  Console.Info("diagnosing: " + Fs.FromVscode(pack.folder));

  ForEachDocument(MinecraftFormat.GetPackFiles(pack), ProvideDiagnostics, reporter);
}
