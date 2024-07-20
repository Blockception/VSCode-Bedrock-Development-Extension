import { CompletionBuilder } from "../../builder/builder";
import { Kinds } from "../../../../constants/kinds";
import { PackType } from "bc-minecraft-bedrock-project";
import { ResourcePack, BehaviorPack } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../../util/simple-context";
import { Vanilla } from "bc-minecraft-bedrock-vanilla-data";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const packType = PackType.detect(context.doc.uri);

  switch (packType) {
    case PackType.behavior_pack:
      return provideBehaviorPackCompletion(context);

    case PackType.resource_pack:
      return provideResourcePackCompletion(context);
  }
}

export function provideResourcePackCompletion(
  context: SimpleContext<CompletionBuilder>,
  prefixed: boolean = false
): void {
  const fileType = ResourcePack.FileType.detect(context.doc.uri);

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
      context.projectData.ResourcePacks.entities.forEach((entity) => {
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

export function provideBehaviorPackCompletion(context: SimpleContext<CompletionBuilder>): void {
  switch (BehaviorPack.FileType.detect(context.doc.uri)) {
    case BehaviorPack.FileType.block:
    case BehaviorPack.FileType.item:
    case BehaviorPack.FileType.entity:
      return provideGeometries(context);
  }
}

function provideGeometries(context: SimpleContext<CompletionBuilder>) {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Models });
  const gen = (item: ResourcePack.Material.Material) => `The model: ${item}\nDeclared in: ${item.location.uri}`;

  builder.generate(context.projectData.ResourcePacks.models, gen);
  builder.generate(Vanilla.ResourcePack.Models, (item) => `The vanilla model: ${item}`);
}
