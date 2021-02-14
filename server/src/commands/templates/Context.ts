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
import { ProjectData } from "../../code/include";
import { Database } from "../../database/include";
import { Manager } from "../../manager/Manager";

export interface Context {
  BehaviorPack: string;
  ResourcePack: string;
  WorldFolder: string;
  WorkFolder : string;
}

export function GetContext(): Context | undefined {
  let Data = Database.MinecraftProgramData.GetProjecData();
  if (Data === undefined) return undefined;

  return Convert(Data);
}

export function GetContextAsync<T>(data: T, callback: (c: Context, data: T) => void): void {
  Database.MinecraftProgramData.GetProjecData((projectData) => {
    let Context = Convert(projectData);

    if (Context) callback(Context, data);
  });
}

function Convert(Data: ProjectData): Context | undefined {
  let Base: string | undefined;

  //Some assembly required
  if (Data.ResourcePackFolders.length === 0 || Data.BehaviourPackFolders.length === 0) {
    if (Data.WorldFolders.length > 0) {
      Base = Data.WorldFolders[0];
    } else if (Data.Workspaces.length > 0) {
      Base = decodeURI(Data.Workspaces[0]);
    }
  }
  else if (Data.Workspaces.length > 0) {
    Base = decodeURI(Data.Workspaces[0]);
  }

  let WP: string | undefined;
  let BP: string | undefined;
  let RP: string | undefined;

  if (Data.WorldFolders.length > 0) {
    WP = Data.WorldFolders[0];
  }
  if (Data.BehaviourPackFolders.length > 0) {
    BP = Data.BehaviourPackFolders[0];
  }
  if (Data.ResourcePackFolders.length > 0) {
    RP = Data.ResourcePackFolders[0];
  }

  if (Base === undefined) {
    if (BP === undefined || RP === undefined || WP === undefined) {
      Manager.Connection.window.showErrorMessage("Cannot get context on either: workspace, behavior pack, resourcepack or world");

      return undefined;
    }

    Base = "";
  }

  if (!Base.endsWith("/")) {
    Base += "/";
  }

  if (WP === undefined) {
    WP = Base;
  }

  if (BP === undefined) {
    BP = Base + "behavior_packs/missing_BP/";
  }

  if (RP === undefined) {
    RP = Base + "resource_packs/missing_RP/";
  }

  let Context: Context = { BehaviorPack: BP, ResourcePack: RP, WorldFolder: WP, WorkFolder: Base };

  return Context;
}
