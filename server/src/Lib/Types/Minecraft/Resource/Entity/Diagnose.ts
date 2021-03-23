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
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../Code/Json/include";
import { Database } from "../../../../Database/Database";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { Entity, render_controller_ref } from "../Entity/Entity";

export function Diagnose(doc: TextDocument): void {
  let Builder = new DiagnosticsBuilder(doc);
  let JDoc = new JsonDocument(doc);

  InternalDiagnose(JDoc, Builder);

  Builder.SendDiagnostics();
}

function InternalDiagnose(JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  const Entity = JDoc.CastTo<Entity>();

  if (Entity === null || Entity === undefined) return;

  const description = Entity["minecraft:client_entity"].description;

  if (description.animations) {
    for (let animation in description.animations) {
      let data = description.animations[animation];
      DiagnoseAnimOrController(data, JDoc, Builder);
    }
  }

  if (description.geometry) {
    for (let geo in description.geometry) {
      let data = description.geometry[geo];
      DiagnoseGeo(data, JDoc, Builder);
    }
  }

  if (description.render_controllers) {
    for (let rc in description.render_controllers) {
      let data = description.render_controllers[rc];
      DiagnoseRenderController(data, JDoc, Builder);
    }
  }

  if (description.textures) {
    for (let texture in description.textures) {
      let data = description.textures[texture];
      DiagnoseTexture(data, JDoc, Builder);
    }
  }
}

function DiagnoseAnimOrController(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  const Resource = Database.Data.Resourcepack;

  if (!(Resource.Animations.HasID(id) || Resource.AnimationControllers.HasID(id))) {
    Builder.Add("Cannot find animation or controller: " + id, JDoc.RangeOf(id));
  }
}

function DiagnoseGeo(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (!Database.Data.Resourcepack.Models.HasID(id)) {
    Builder.Add("Cannot find model: " + id, JDoc.RangeOf(id));
  }
}

function DiagnoseTexture(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  //TODO add texture code detection
}

function DiagnoseRenderController(id: render_controller_ref, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (typeof id !== "string") {
    id = Object.keys(id)[0];
  }

  if (!Database.Data.Resourcepack.RenderControllers.HasID(id)) {
    Builder.Add("Cannot find resource controller: " + id, JDoc.RangeOf(id));
  }
}
