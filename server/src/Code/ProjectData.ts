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
import * as fg from "fast-glob";
import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { JsonDocument } from "./json/Json Document";
import { Manager } from "../Manager/Manager";
import { DupeCheckAdd } from "./Array";
import { GetParent } from "./File";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { Manifest } from "../Types/Minecraft/Manifest/include";
import { Console } from "../Console/Console";

export interface ProjectData {
  WorldFolders: string[];
  ResourcePackFolders: string[];
  BehaviourPackFolders: string[];
  Workspaces: string[];
}

export function GetProjectData(): Promise<ProjectData | undefined> {
  let WS = Manager.Connection.workspace.getWorkspaceFolders();

  return WS.then(
    (x) => new Promise<ProjectData | undefined>((resolve, reject) => resolve(CheckStructure(x)))
  );
}

function CheckStructure(folders: WorkspaceFolder[] | null): ProjectData | undefined {
  Console.Log("discovering workspace layout");
  let dirs: string[] = [];

  if (folders == null) return undefined;

  let PD: ProjectData = {
    BehaviourPackFolders: [],
    ResourcePackFolders: [],
    WorldFolders: [],
    Workspaces: [],
  };

  for (let I = 0; I < folders.length; I++) {
    const uri = folders[I].uri;
    let Path = URI.parse(uri).fsPath;
    PD.Workspaces.push(uri);
    dirs.push(Path);
  }

  for (let I = 0; I < dirs.length; I++) {
    let dir = dirs[I];

    if (!dir.endsWith("\\")) dir += "\\";

    dir = dir.replace(/\\/g, "/");
    dirs[I] = dir + "**/manifest.json";
  }

  const entries = fg.sync(dirs, { absolute: true, onlyFiles: true });

  for (let J = 0; J < entries.length; J++) {
    let item = entries[J];
    let parent = GetParent(item);
    let Type = DetectGeneralDataType(item);

    switch (Type) {
      case GeneralDataType.behaviour_pack:
        DupeCheckAdd(PD.BehaviourPackFolders, parent);
        continue;

      case GeneralDataType.resource_pack:
        DupeCheckAdd(PD.ResourcePackFolders, parent);
        continue;

      case GeneralDataType.world:
        DupeCheckAdd(PD.WorldFolders, parent);
        break;

      default:
        let JDoc = JsonDocument.GetDocument(item);
        let manifest = JDoc.CastTo<Manifest>();

        if (!manifest) break;

        Type = Manifest.DetectType(manifest);

        switch (Type) {
          case GeneralDataType.behaviour_pack:
            DupeCheckAdd(PD.BehaviourPackFolders, parent);
            continue;

          case GeneralDataType.resource_pack:
            DupeCheckAdd(PD.ResourcePackFolders, parent);
            continue;

          case GeneralDataType.world:
            DupeCheckAdd(PD.WorldFolders, parent);
            break;
        }
    }
  }

  return PD;
}
