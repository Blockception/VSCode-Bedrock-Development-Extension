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
    }

    if (APPDATA.endsWith("Roaming")) {
      APPDATA = path.join(APPDATA, "..");
    }

    APPDATA = path.join(APPDATA, "Local", "Packages");
    let Childern = readdirSync(APPDATA);

    for (let I = 0; I < Childern.length; I++) {
      const Child = Childern[I];
      if (Child.includes("Microsoft.MinecraftUWP")) {
        let folder = path.join(APPDATA, Child);
        FindLastestLog(folder);
      }
    }
  } catch (error) {
    window.showErrorMessage("error occured during finding the logs");
    console.log(JSON.stringify(error));
  }
}

function FindLastestLog(folder: string): void {
  let LogFolder = path.join(folder, "LocalState", "logs");
  let Lastest: string = "";
  let LastestTime: number;

  let Childern = readdirSync(LogFolder);

  for (let I = 0; I < Childern.length; I++) {
    const Child = Childern[I];

    if (Child.startsWith("ContentLog_") && Child.endsWith(".txt")) {
      let filepath = path.join(LogFolder, Child);
      let stat = statSync(filepath);

      if (Lastest === "" || stat.mtimeMs > LastestTime) {
        Lastest = filepath;
        LastestTime = stat.mtimeMs;
      }
    }
  }

  if (Lastest !== "") {
    let uri = Uri.file(Lastest);

    window.showTextDocument(uri).then((ed) => {
      languages.setTextDocumentLanguage(ed.document, "log");
    });
  } else {
    window.showInformationMessage("Couldn't find content logs");
  }
}
