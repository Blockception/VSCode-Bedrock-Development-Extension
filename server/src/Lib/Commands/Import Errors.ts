import { readdirSync } from "fs";
import { ExecuteCommandParams } from "vscode-languageserver";
import { Database } from "../Database/Database";
import { GetDocument } from "../Types/Document/include";
import { ProcessContentLog } from "../Types/Minecraft/Logs/Content Logs/include";

/**
 *
 * @param params
 */
export function McImportErrorsCommand(params: ExecuteCommandParams): void {
  let Folder = Database.MinecraftProgramData.GetBedrockInstallLocation();

  if (Folder === "") {
    return;
  }
  Folder += "LocalState\\logs\\";
  let LogFile = GetLastestLogFile(Folder);

  let Doc = GetDocument(LogFile);
  ProcessContentLog(Doc);
}

/**
 * retrieves the lastest log file in the log folder
 * @param dir
 */
function GetLastestLogFile(dir: string): string {
  let Files = readdirSync(dir);
  let LastestFilename = "";
  let LastestData = -1;

  for (let I = 0; I < Files.length; I++) {
    let F = Files[I];

    if (F.includes("ContentLog")) {
      let Value = ParseFilename(F);

      if (Value > LastestData) {
        LastestFilename = dir + F;
        LastestData = Value;
      }
    }
  }

  return LastestFilename;
}

/**
 *
 * @param name
 */
function ParseFilename(name: string): number {
  let Matches = name.match(/(ContentLog)__([a-zA-Z]+)__(\d+)_([a-zA-Z]+)_(\d+)__(\d+)_(\d+)_(\d+)_(\d+)/);

  if (Matches) {
    if (Matches.length >= 9) {
      let Text = Matches[3] + Matches[5] + Matches[6] + Matches[7] + Matches[8] + Matches[9];
      return Number.parseInt(Text);
    }
  }

  return -1;
}
