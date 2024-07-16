import { Pack } from "bc-minecraft-bedrock-project";
import { Fs } from "../Code/Url";
import { Database } from "../database/database";
import { Console } from "../manager/console";
import { Manager } from "../manager/manager";
import { MinecraftFormat } from "../minecraft/Format";
import { ForEachDocument } from "../types/Document/Document";
import { TextDocument } from "../types/Document/TextDocument";
import { ProgressBar } from "../types/Progress/ProgressBar";

export function provideDiagnostics(doc: TextDocument): void {
  if (!Manager.State.DataGathered) return;

  diagnoseDocument(doc);
}

function diagnoseDocument(doc: TextDocument): void {
  //Send it off to the diagnoser
  Database.Diagnoser.process(doc);
}

export function providePackDiagnostics(pack: Pack, reporter?: ProgressBar): Promise<string[]> {
  if (!Manager.State.DataGathered) return Promise.resolve<string[]>([]);

  Console.Info("Diagnosing pack: " + Fs.FromVscode(pack.folder));

  return ForEachDocument(MinecraftFormat.GetPackFiles(pack), diagnoseDocument, reporter);
}