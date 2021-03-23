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
import { URI } from "vscode-uri";
import { GetDocuments } from "../Lib/Code/include";
import { JsonDocument } from "../Lib/Code/Json/include";
import { ValidationData } from "./Validation";

export function GetValidationData(workspaces: string[]): ValidationData {
  let Out: ValidationData = ValidationData.createEmpty();

  workspaces.forEach((ws) => {
    ws = URI.parse(ws).fsPath;

    if (!ws.endsWith("\\")) ws += "\\";
    ws = ws.replace(/\\/g, "/");

    GetDocuments(ws, "**/minecraft-validation.json").forEach((D) => Process(D, Out));
  });

  return Out;
}

function Process(uri: string, receiver: ValidationData): void {
  let doc = JsonDocument.GetDocument(uri);

  let data = doc.CastTo<ValidationData>();

  if (data === undefined || data === null) return;

  data.objectives?.invalid?.forEach((m) => receiver.objectives?.invalid?.push(m));
  data.objectives?.valid?.forEach((m) => receiver.objectives?.valid?.push(m));

  data.tags?.invalid?.forEach((m) => receiver.tags?.invalid?.push(m));
  data.tags?.valid?.forEach((m) => receiver.tags?.valid?.push(m));
}
