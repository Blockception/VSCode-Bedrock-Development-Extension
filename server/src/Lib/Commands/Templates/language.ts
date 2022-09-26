import { TemplateBuilder } from "./Builder";
import * as path from "path";
import { Pack, Util } from 'bc-minecraft-bedrock-project';
import { generate_bp, generate_rp, generate_wp, TextEditBuilder } from '../Language/AddAll';
import { Database } from '../../Database/Database';

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
 * @param Pack
 * @param Builder
 */
export function create_language_files(Pack: Pack | string, Builder: TemplateBuilder, additional?: (builder: TextEditBuilder) => void): void {
  if (typeof Pack === "string") {
    let nPack = Database.ProjectData.get(Pack);

    if (nPack === undefined) return;
    Pack = nPack;
  }

  const BaseFolder = path.join(Pack.folder, "texts");
  PrivateCreate(BaseFolder, Builder, "languages.json", JSON.stringify(LanguageNames));

  let content = LanguageContent;
  const builder = new TextEditBuilder(undefined);

  if (Util.IsResourcePack(Pack)) {
    generate_rp(Pack, builder);
  }
  else if (Util.IsBehaviorPack(Pack)) {
    generate_bp(Pack, builder);
  }
  else if (Util.IsWorldPack(Pack)) {
    generate_wp(Pack, builder);
  }
  content += builder.out;

  if (additional !== undefined) {
    additional(builder);
  }

  for (let I = 0; I < LanguageNames.length; I++) {
    PrivateCreate(BaseFolder, Builder, `${LanguageNames[I]}.lang`, content);
  }
}

function PrivateCreate(BaseFolder: string, Builder: TemplateBuilder, Name: string, Content: string): void {
  const uri = path.join(BaseFolder, Name);
  Builder.CreateFile(uri, Content);
}
