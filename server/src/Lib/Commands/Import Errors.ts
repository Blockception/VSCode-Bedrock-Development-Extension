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
import { readdirSync } from "fs";
import { ExecuteCommandParams } from "vscode-languageserver";
import { GetDocument } from "../Code/include";
import { Database } from "../Database/Database";
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
