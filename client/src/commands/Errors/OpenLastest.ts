/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
	 list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
	 this list of conditions and the following disclaimer in the documentation
	 and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
	 contributors may be used to endorse or promote products derived from
	 this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { fstat, readdirSync, statSync } from "fs";
import path = require("path");
import { commands, ExtensionContext, Uri, window } from "vscode";
import { TextDocument } from "vscode-languageserver-types";
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

      if (Lastest === "" || stat.mtimeMs < LastestTime) {
        Lastest = filepath;
        LastestTime = stat.mtimeMs;
      }
    }
  }

  if (Lastest !== "") {
    let uri = Uri.file(Lastest);
    window.showTextDocument(uri);
  } else {
    window.showInformationMessage("Couldn't find content logs");
  }
}
