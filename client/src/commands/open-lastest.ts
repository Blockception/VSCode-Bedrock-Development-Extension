import { readdirSync, statSync } from "fs";
import { commands, ExtensionContext, languages, Uri, window } from "vscode";
import { Commands } from "@blockception/shared";

import path from "path";

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(Commands.Errors.OpenLastest, openLastestError));
}

function openLastestError(args: any): void {
  try {
    let APPDATA = process.env.APPDATA;

    //if start folder doesnt exist
    if (!APPDATA) {
      window.showErrorMessage("Couldn't find the AppData folder");
      return;
    }

    if (APPDATA.endsWith("Roaming")) {
      APPDATA = path.join(APPDATA, "..");
    }

    APPDATA = path.join(APPDATA, "Local", "Packages");
    const Childern = readdirSync(APPDATA);

    for (let I = 0; I < Childern.length; I++) {
      const Child = Childern[I];
      if (Child.includes("Microsoft.MinecraftUWP")) {
        const folder = path.join(APPDATA, Child);
        findLastestLog(folder);
      }
    }
  } catch (error) {
    handleError(error);
  }
}

function findLastestLog(folder: string): void {
  const LogFolder = path.join(folder, "LocalState", "logs");
  let Lastest = "";
  let LastestTime = 0;

  const Childern = readdirSync(LogFolder);

  for (let I = 0; I < Childern.length; I++) {
    const Child = Childern[I];

    if (Child.startsWith("ContentLog_") && Child.endsWith(".txt")) {
      const filepath = path.join(LogFolder, Child);
      const stat = statSync(filepath);

      if (Lastest === "" || stat.mtimeMs > LastestTime) {
        Lastest = filepath;
        LastestTime = stat.mtimeMs;
      }
    }
  }

  if (Lastest !== "") {
    const uri = Uri.file(Lastest);

    window.showTextDocument(uri).then((ed) => {
      languages.setTextDocumentLanguage(ed.document, "log");
    });
  } else {
    window.showInformationMessage("Couldn't find content logs");
  }
}
function handleError(error: unknown) {
  throw new Error("Function not implemented.");
}
