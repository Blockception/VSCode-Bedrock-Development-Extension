import { TemplateBuilder } from "./builder";
import { Pack, Util } from "bc-minecraft-bedrock-project";
import { generate_bp, generate_rp, generate_wp, TextEditBuilder } from "../commands/commands/language";
import { LanguageContent, LanguageNames } from "./definitions/languages";

import * as path from "path";

/**
 *
 * @param pack
 * @param builder
 */
export function create_language_files(
  pack: Pack | string,
  builder: TemplateBuilder,
  additional?: (builder: TextEditBuilder) => void
): void {
  if (typeof pack === "string") {
    const nPack = builder.context.database.ProjectData.get(pack);

    if (nPack === undefined) return;
    pack = nPack;
  }

  const baseFolder = path.join(pack.folder, "texts");
  internalCreate(baseFolder, builder, "languages.json", JSON.stringify(LanguageNames, undefined, 2));

  let content = LanguageContent;
  const textBuilder = new TextEditBuilder(undefined);

  if (Util.IsResourcePack(pack)) {
    generate_rp(pack, textBuilder);
  } else if (Util.IsBehaviorPack(pack)) {
    generate_bp(pack, textBuilder);
  } else if (Util.IsWorldPack(pack)) {
    generate_wp(pack, textBuilder);
  }

  if (additional !== undefined) {
    additional(textBuilder);
  }

  content += textBuilder.out;

  for (let I = 0; I < LanguageNames.length; I++) {
    internalCreate(baseFolder, builder, `${LanguageNames[I]}.lang`, content);
  }
}

function internalCreate(BaseFolder: string, Builder: TemplateBuilder, Name: string, Content: string): void {
  const uri = path.join(BaseFolder, Name);
  Builder.createFile(uri, Content);
}
