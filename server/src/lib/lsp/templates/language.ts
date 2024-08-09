import { TemplateBuilder } from "./builder";
import { Pack, Util } from "bc-minecraft-bedrock-project";
import { generate_bp, generate_rp, generate_wp, TextEditBuilder } from "../commands/commands/language";
import * as path from "path";

export const LanguageNames: string[] = [
  "en_US",
  "en_GB",
  "de_DE",
  "es_ES",
  "es_MX",
  "fr_FR",
  "fr_CA",
  "it_IT",
  "ja_JP",
  "ko_KR",
  "pt_BR",
  "pt_PT",
  "ru_RU",
  "zh_CN",
  "zh_TW",
  "nl_NL",
  "bg_BG",
  "cs_CZ",
  "da_DK",
  "el_GR",
  "fi_FI",
  "hu_HU",
  "id_ID",
  "nb_NO",
  "pl_PL",
  "sk_SK",
  "sv_SE",
  "tr_TR",
  "uk_UA",
];

const LanguageContent = `## Comments can be added anywhere on a valid line by starting with '##'
##
## Note, trailing spaces will NOT be trimmed. If you want room between the end of the string and the start of a
## comment on the same line, use TABs.'
pack.name=Example pack name
pack.description=The text that describes this example pack\n`;

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
    let nPack = builder.context.database.ProjectData.get(pack);

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
