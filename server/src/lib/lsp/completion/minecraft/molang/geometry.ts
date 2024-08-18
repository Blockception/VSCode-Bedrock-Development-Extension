import { BehaviorPack, PackType, ResourcePack } from "bc-minecraft-bedrock-project";
import { Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { Kinds } from "../../../../constants";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";

export function provideCompletion(context: Context<CompletionContext>): void {
  const packType = PackType.detect(context.document.uri);

  switch (packType) {
    case PackType.behavior_pack:
      return provideBehaviorPackCompletion(context);

    case PackType.resource_pack:
      return provideResourcePackCompletion(context);
  }
}

export function provideResourcePackCompletion(context: Context<CompletionContext>, prefixed: boolean = false): void {
  const fileType = ResourcePack.FileType.detect(context.document.uri);

  switch (fileType) {
    case ResourcePack.FileType.item:
    case ResourcePack.FileType.entity:
    case ResourcePack.FileType.attachable:
      return provideGeometries(context);

    default:
    case ResourcePack.FileType.animation:
    case ResourcePack.FileType.animation_controller:
    case ResourcePack.FileType.render_controller:
      const builder = context.builder.withDefaults({ kind: Kinds.Completion.Models });
      context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
        entity.molang.geometries.defined.forEach((geo) => {
          const label = prefixed ? `Geometry.${geo}` : geo;
          builder.add({
            label,
            documentation: `The defined geomtry: ${geo}\nDeclared by: ${entity.id}`,
          });
        });
      });
      break;
  }
}

export function provideBehaviorPackCompletion(context: Context<CompletionContext>): void {
  switch (BehaviorPack.FileType.detect(context.document.uri)) {
    case BehaviorPack.FileType.block:
    case BehaviorPack.FileType.item:
    case BehaviorPack.FileType.entity:
      return provideGeometries(context);
  }
}

function provideGeometries(context: Context<CompletionContext>) {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Models });
  const gen = (item: ResourcePack.Material.Material) => `The model: ${item}\nDeclared in: ${item.location.uri}`;

  builder.generate(context.database.ProjectData.resourcePacks.models, gen);
  builder.generate(Vanilla.ResourcePack.Models, (item) => `The vanilla model: ${item}`);
}
