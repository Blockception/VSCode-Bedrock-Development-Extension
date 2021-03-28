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
import { DidChangeConfigurationParams } from "vscode-languageserver/node";
import { Identification } from "../Constants";
import { Manager } from "../Manager/Manager";

export interface ServerSettings {
  Education: {
    Enable: boolean;
  };
  Diagnostics: {
    Lang: boolean;
    Json: boolean;
    Mcfunctions: boolean;
    Objectives: boolean;
    Tags: boolean;
  };
}

export namespace ServerSettings {
  export function is(value: any): value is ServerSettings {
    if (value) {
      let temp = <ServerSettings>value;

      if (temp.Education && temp.Diagnostics) {
        if (typeof temp.Education.Enable !== "boolean") return false;

        if (typeof temp.Diagnostics.Lang !== "boolean") return false;
        if (typeof temp.Diagnostics.Json !== "boolean") return false;
        if (typeof temp.Diagnostics.Mcfunctions !== "boolean") return false;
        if (typeof temp.Diagnostics.Objectives !== "boolean") return false;
        if (typeof temp.Diagnostics.Tags !== "boolean") return false;

        return true;
      }
    }

    return false;
  }

  export function createDefaulSettings(): ServerSettings {
    let Out: ServerSettings = {
      Education: {
        Enable: true,
      },
      Diagnostics: {
        Lang: true,
        Json: true,
        Mcfunctions: true,
        Objectives: true,
        Tags: true,
      },
    };

    return Out;
  }
}

export function OnConfigurationChanged(params: DidChangeConfigurationParams): void {
  UpdateSettings();
}

export function UpdateSettings(): void {
  let Settings = Manager.Connection.workspace.getConfiguration(Identification.SettingsConfigurationIdentifier);

  //If settings is nothing then skip it.
  if (Settings === undefined || Settings === null) return;

  Settings.then(UpdateSettingsThen);
}

function UpdateSettingsThen(data: any): void {
  //If settings is nothing then skip it.
  if (data === undefined || data === null) return;

  let Casted = <ServerSettings>data;

  if (ServerSettings.is(Casted)) {
    Manager.Settings = Casted;
  }
}
