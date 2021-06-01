import { JsonDocument } from "../../Document/Json Document";
import { GeneralDataType } from "../Format/General Data Type";

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

  export function IsBehaviorManifest(m: Manifest): boolean {
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
    if (!m.modules) return GeneralDataType.unknown;

    for (let I = 0; I < m.modules.length; I++) {
      const mod = m.modules[I];

      switch (mod.type) {
        case ManifestModule.TypeData:
          return GeneralDataType.behavior_pack;

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
