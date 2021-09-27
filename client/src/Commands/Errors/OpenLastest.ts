import { readdirSync, statSync } from "fs";
import path = require("path");
import { commands, ExtensionContext, languages, Uri, window } from "vscode";
import { Commands } from "../../Constants";

export function Activate(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(Commands.Errors.OpenLastest, OpenLastestError));
}

function OpenLastestError(args: any): void {
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
        FindLastestLog(folder);
      }
    }
  } catch (error) {
    HandleError(error);
  }
}

function FindLastestLog(folder: string): void {
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
function HandleError(error: unknown) {
  throw new Error("Function not implemented.");
}
