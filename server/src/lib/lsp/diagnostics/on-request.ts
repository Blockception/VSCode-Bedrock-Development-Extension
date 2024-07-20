import { Pack } from "bc-minecraft-bedrock-project";
import { Fs } from "../../util/url";
import { TextDocument } from '../documents/text-document';
import { Manager } from '../../manager/manager';
import { Database } from '../../lsp/database/database';
import { ProgressBar } from '../progress/progress-bar';
import { Console } from '../../manager/console';
import { ForEachDocument } from '../documents/document';
import { MinecraftFormat } from '../../minecraft/format';

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
