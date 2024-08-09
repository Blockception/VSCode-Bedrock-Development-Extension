import { PackType } from "bc-minecraft-bedrock-project";
import { ResourcePack, BehaviorPack } from "bc-minecraft-bedrock-project";
import { Vanilla } from "bc-minecraft-bedrock-vanilla-data";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';
import { CompletionBuilder } from "../../builder/builder";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: Context<CompletionContext>): void {
  const packType = PackType.detect(context.document.uri);

  switch (packType) {
    case PackType.behavior_pack:
      return provideBehaviorPackCompletion(context);

    case PackType.resource_pack:
      return provideResourcePackCompletion(context);
  }
}

export function provideResourcePackCompletion(
  context: Context<CompletionContext>,
  prefixed: boolean = false
): void {
  const fileType = ResourcePack.FileType.detect(context.document.uri);

  switch (fileType) {
    case ResourcePack.FileType.item:
    case ResourcePack.FileType.entity:
    case ResourcePack.FileType.attachable:
      return provideMaterials(context);

    default:
    case ResourcePack.FileType.animation:
    case ResourcePack.FileType.animation_controller:
    case ResourcePack.FileType.render_controller:
      const builder = context.builder.withDefaults({ kind: Kinds.Completion.Materials });
      context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
        entity.molang.materials.defined.forEach((item) => {
          const label = prefixed ? `Material.${item}` : item;
          builder.add({
            label,
            documentation: `The defined material: ${item}\nDeclared by: ${entity.id}`,
          });
        });
      });
      break;
  }
}

export function provideBehaviorPackCompletion(context: Context<CompletionContext>): void {
  const fileType = BehaviorPack.FileType.detect(context.document.uri);

  switch (fileType) {
    case BehaviorPack.FileType.block:
    case BehaviorPack.FileType.item:
    case BehaviorPack.FileType.entity:
      return provideMaterials(context);
  }
}

function provideMaterials(context: Context<CompletionContext>) {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Materials });

  const gen = (item: ResourcePack.Material.Material) => `The material: ${item}\nDeclared in: ${item.location.uri}`;

  builder.generate(context.database.ProjectData.resourcePacks.materials, gen);
  builder.generate(Vanilla.ResourcePack.Materials, (item) => `The vanilla material: ${item}`);
}
