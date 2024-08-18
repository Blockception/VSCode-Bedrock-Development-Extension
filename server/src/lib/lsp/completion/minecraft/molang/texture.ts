import { PackType } from "bc-minecraft-bedrock-project";
import { Kinds } from "../../../../constants";
import { Context } from "../../../context/context";
import { CompletionContext } from "../../context";

export function provideCompletion(context: Context<CompletionContext>, prefixed: boolean = false): void {
  const packType = PackType.detect(context.document.uri);

  switch (packType) {
    case PackType.behavior_pack:
      return;

    case PackType.resource_pack:
      const builder = context.builder.withDefaults({ kind: Kinds.Completion.Texture });
      context.database.ProjectData.resourcePacks.entities.forEach((entity) => {
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
