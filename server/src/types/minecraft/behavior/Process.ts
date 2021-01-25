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
import { GetFilename } from "../../../code/File";
import { GetDocuments } from "../../../code/include";
import { Console } from '../../../console/Console';
import { code } from "../../../include";
import { DataType } from "../format/Data Type";
import { DetectDataType } from "../format/Detection";
import * as behaviour from "./include";

export function Process(doc: TextDocument): void {
  let Type = DetectDataType(doc.uri);
  if (Type === DataType.unknown) return;

  Console.Log("    Processing behavior pack file: " + GetFilename(doc.uri));
  ValidateFolder(doc);

  switch (Type) {
    case DataType.behaviour_animation:
      return behaviour.animations.Process(doc);

    case DataType.behaviour_animation_controller:
      return behaviour.animation_controllers.Process(doc);

    case DataType.behaviour_block:
      return behaviour.blocks.Process(doc);

    case DataType.behaviour_entity:
      return behaviour.entities.Process(doc);

    case DataType.behaviour_function:
      return behaviour.functions.Process(doc);

    case DataType.behaviour_item:
      return behaviour.items.Process(doc);

    case DataType.behaviour_loot_table:
      return behaviour.loot_table.Process(doc);
  }
}

/**
 * Process the given folder as if it was a behaviour pack
 * @param Folder
 */
export function ProcessBehaviourPack(Folder: string): void {
  Console.Log("Processing behaviour pack: " + Folder);
  code.ForEachDocument(GetDocuments(Folder, ["**/*.json", "**/*.mcfunction"]), Process);
}

export function ValidateFolder(doc: TextDocument): void {
  const uri = doc.uri;
}
