import { QueueProcessor } from "@daanv2/queue-processor";
import { Pack } from "bc-minecraft-bedrock-project";
import { HandleError } from "../Code/Error";
import { Database } from "../Database/Database";
import { providePackDiagnostics } from "../Diagnostics/OnRequest";
import { Console } from "../Manager/Console";
import { Manager } from "../Manager/Manager";
import { ProgressBar } from "../Types/Progress/ProgressBar";
import { Workspace } from "../Workspace/Workspace";

export async function Traverse(): Promise<Pack[]> {
  Console.Info("Traversing starting...");
  Database.Clear();
  Manager.State.TraversingProject = true;
  Manager.State.DataGathered = false;

  const reporter = ProgressBar.create("Minecraft: Traverse & Diagnose", 0, 1);

  return reporter.then(TraverseProcess);
}

async function TraverseProcess(reporter: ProgressBar): Promise<Pack[]> {
  const start_time = Date.now();
  reporter.sendMessage("Traversing");
  const out = Workspace.GetWorkSpaces().then(Workspace.TraverseWorkspaces);

  out.finally(() => {
    Manager.State.TraversingProject = false;
    Manager.State.DataGathered = true;
    Console.Info("Traversing complete");
  });

  out.catch((err) => {
    HandleError(err);
    reporter.done();
  });

  out.then((packs) => {
    reporter.setMaximum(packs.length * 2);
    reporter.setValue(packs.length);

    reporter.sendMessage("Diagnosing");

    const processor = new QueueProcessor(packs, (pack) => {
      const p = providePackDiagnostics(pack, reporter);

      reporter.addValue(1);
      reporter.sendProgress();

      return p.then((items) => {});
    });

    processor.finally(() => {
      Console.Info("Diagnostics completed");
      reporter.done();

      const end_time = Date.now();
      const span = new Date(end_time - start_time);
      Console.Info(`Took: ${span.getMinutes()}:${span.getSeconds()}:${span.getMilliseconds()} for ${reporter.getMaximum()} items`);
    });
  });

  return out;
}
