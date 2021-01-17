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
import { ExecuteCommandParams, MessageType, ShowMessageNotification } from "vscode-languageserver";
import { Database } from "../database/include";
import { DiagnoseContext } from "../diagnostics/types/Context";
import { Manager } from "../manager/Manager";
import { behavior, world } from "../types/minecraft/include";
import { GetValidationData } from "../validation/include";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  console.log("Starting on diagnosing project");

  Database.MinecraftProgramData.GetProjecData((data) => {
    let Validation = GetValidationData(data.Workspaces);

    let context: DiagnoseContext = {
      projectStructure: data,
      data: Validation,
    };

    if (Manager.State.TraversingProject || !Manager.State.DataGathered) {
      Manager.Connection.sendNotification(ShowMessageNotification.type, {
        message: "Extension is traversing the project. please wait a couple more seconds.",
        type: MessageType.Info,
      });
      return;
    }

    world.Diagnose(context);
    behavior.Diagnose(context);

    console.log("Diagnosing done");
  });
}
