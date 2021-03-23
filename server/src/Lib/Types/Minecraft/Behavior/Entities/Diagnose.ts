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
import { DiagnosticSeverity, Range } from "vscode-languageserver-types";
import { JsonDocument } from "../../../../Lib/Code/Json/Json Document";
import { DiagnosticsBuilder } from "../../../../Diagnostics/include";
import { Database } from "../../../../include";
import { Entity } from "./Entity";

/**
 *
 * @param doc
 */
export function Diagnose(doc: TextDocument): void {
  let Builder = new DiagnosticsBuilder(doc);
  let JDoc = new JsonDocument(doc);

  InternalDiagnose(JDoc, Builder);

  Builder.SendDiagnostics();
}

/**
 *
 * @param JDoc
 * @param Builder
 * @returns
 */
function InternalDiagnose(JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  let Entity = JDoc.CastTo<Entity>();
  if (Entity === undefined || Entity === null) {
    Builder.Add("Cannot parse entity", undefined, DiagnosticSeverity.Warning);
    return;
  }

  if (Entity["minecraft:entity"].description.animations) {
    for (let id in Entity["minecraft:entity"].description.animations) {
      let animation = Entity["minecraft:entity"].description.animations[id];
      DiagnoseAnimOrController(animation, JDoc, Builder);
    }
  }

  if (Entity["minecraft:entity"].events) {
    for (let id in Entity["minecraft:entity"].events) {
      let event = Entity["minecraft:entity"].events[id];

      if (event.add) DiagnoseComponentGroups(event.add.component_groups, Entity, JDoc, Builder);
      if (event.remove) DiagnoseComponentGroups(event.remove.component_groups, Entity, JDoc, Builder);
    }
  }
}

/** Tries to find the animation or animation controller
 * @param id
 * @param JDoc
 * @param Builder
 */
function DiagnoseAnimOrController(id: string, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (!(Database.Database.Data.Behaviourpack.Animations.HasID(id) || Database.Database.Data.Behaviourpack.AnimationControllers.HasID(id))) {
    Builder.Add("Cannot find animation or controller: " + id, JDoc.RangeOf(id));
  }
}

function DiagnoseComponentGroups(groups: string | string[] | undefined, entity: Entity, JDoc: JsonDocument, Builder: DiagnosticsBuilder): void {
  if (groups === undefined) return;

  if (typeof groups === "string") {
    groups = [groups];
  }

  for (var group of groups) {
    if (entity["minecraft:entity"].component_groups) {
      let data = entity["minecraft:entity"].component_groups[group];

      if (data) continue;
    }

    Builder.Add("Cannot find componentgroup: " + group, JDoc.RangeOf(group));
  }
}
