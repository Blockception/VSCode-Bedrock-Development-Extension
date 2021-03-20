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
import { JsonDocument } from "../../../Code/json/include";
import { GeneralDataType } from "../format/General Data Type";

export interface Manifest {
  format_verison: string;
  header: ManifestHeader;
  modules: ManifestModule[];
  metadata: ManifestMetadata;
}

export interface ManifestHeader {
  name: string;
  description: string;
  uuid: string;
  version: number[];
  lock_template_options: boolean;
  base_game_version: number[];
}

export interface ManifestModule {
  type: string;
  uuid: string;
  version: number[];
}

export namespace ManifestModule {
  export const TypeResource = "resources";
  export const TypeData = "data";
  export const TypeWorld = "world_template";
  export const TypeSkinPack = "skin_pack";
}

export interface ManifestMetadata {
  authors: string[];
}

export namespace Manifest {
  export function IsWorldManifest(m: Manifest): boolean {
    let modules = m.modules;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeWorld) return true;
    }

    return false;
  }

  export function IsResourceManifest(m: Manifest): boolean {
    let modules = m.modules;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeResource) return true;
    }

    return false;
  }

  export function IsBehaviourManifest(m: Manifest): boolean {
    let modules = m.modules;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeData) return true;
    }

    return false;
  }

  export function IsSkinpackManifest(m: Manifest): boolean {
    let modules = m.modules;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeSkinPack) return true;
    }

    return false;
  }

  export function DetectType(m: Manifest): GeneralDataType {
    for (let I = 0; I < m.modules.length; I++) {
      let mod = m.modules[I];

      switch (mod.type) {
        case ManifestModule.TypeData:
          return GeneralDataType.behaviour_pack;

        case ManifestModule.TypeResource:
          return GeneralDataType.resource_pack;

        case ManifestModule.TypeWorld:
          return GeneralDataType.world;

        case ManifestModule.TypeSkinPack:
          return GeneralDataType.skin_pack;
      }
    }

    return GeneralDataType.unknown;
  }

  export function GetManifest(uri: string): Manifest | undefined {
    let doc = JsonDocument.GetDocument(uri);

    let manifest = doc.CastTo<Manifest>();

    if (manifest) {
      return manifest;
    }

    return undefined;
  }
}
