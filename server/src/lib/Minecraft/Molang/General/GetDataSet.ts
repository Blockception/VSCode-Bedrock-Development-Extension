import { BehaviorPack, PackType, ResourcePack } from "bc-minecraft-bedrock-project";
import { MolangData } from "bc-minecraft-molang";

/** */
export function GetDataSet(uri: string, packType: PackType | undefined = undefined) {
  let out = undefined;

  if (packType === undefined || packType === PackType.resource_pack) {
    if ((out = GetRPDataSet(uri))) return out;
  }

  if (packType === undefined || packType === PackType.behavior_pack) {
    if ((out = GetBPDataSet(uri))) return out;
  }

  return out;
}

export function GetRPDataSet(uri: string): typeof MolangData.Blocks | undefined {
  const RpType = ResourcePack.FileType.detect(uri);

  switch (RpType) {
    case ResourcePack.FileType.animation:
      return MolangData.Animations;

    case ResourcePack.FileType.animation_controller:
      return MolangData.AnimationsControllers;

    case ResourcePack.FileType.attachable:
    case ResourcePack.FileType.item:
      return MolangData.Items;

    case ResourcePack.FileType.block:
      return MolangData.Blocks;

      case ResourcePack.FileType.entity:
        return MolangData.Entities;

    case ResourcePack.FileType.render_controller:
      return MolangData.RenderControllers;

    case ResourcePack.FileType.particle:
      return MolangData.Particles;
  }

  return undefined;
}

export function GetBPDataSet(uri: string): typeof MolangData.Blocks | undefined {
  const BpType = BehaviorPack.FileType.detect(uri);

  switch (BpType) {
    case BehaviorPack.FileType.block:
      return MolangData.Blocks;

    case BehaviorPack.FileType.animation:
    case BehaviorPack.FileType.animation_controller:
    case BehaviorPack.FileType.entity:
      return MolangData.Entities;

    case BehaviorPack.FileType.item:
      return MolangData.Items;

      //TODO Detect type for featureRules
      return MolangData.FeaturesRules;
  }

  return undefined;
}
