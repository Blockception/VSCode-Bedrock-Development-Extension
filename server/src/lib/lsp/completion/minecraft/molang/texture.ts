import { PackType } from "bc-minecraft-bedrock-project";
import { SimpleContext } from "../../../../util/simple-context";
import { CompletionBuilder } from "../../builder/builder";
import { Kinds } from "../../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>, prefixed: boolean = false): void {
  const packType = PackType.detect(context.doc.uri);

  switch (packType) {
    case PackType.behavior_pack:
      return;

    case PackType.resource_pack:
      const builder = context.builder.withDefaults({ kind: Kinds.Completion.Texture });
      context.projectData.ResourcePacks.entities.forEach((entity) => {
        entity.molang.textures.defined.forEach((item) => {
          const label = prefixed ? `Texture.${item}` : item;
          builder.add({
            label,
            documentation: `The defined texture: ${item}\nDeclared by: ${entity.id}`,
          });
        });
      });
  }
}
