import { PackType } from "bc-minecraft-bedrock-project";
import { Kinds } from "../../../../constants";
import { getIdentifier, getScopeDefined } from "../../../../minecraft/molang";
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
        getScopeDefined(entity.molang, "texture").forEach((item) => {
          const label = getIdentifier(item, prefixed);
          builder.add({
            label,
            documentation: `The defined texture: ${label}\nDeclared by: ${entity.id}`,
          });
        });
      });
  }
}
