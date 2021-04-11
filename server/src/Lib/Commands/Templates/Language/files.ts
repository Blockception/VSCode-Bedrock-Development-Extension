import { TemplateBuilder } from "../Builder";
import * as path from "path";

const LanguageNames: string[] = [
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
pack.description=The text that describes this example pack`;

/**
 *
 * @param PackFolder
 * @param Builder
 */
export function create_language_files(PackFolder: string, Builder: TemplateBuilder): void {
  const BaseFolder = path.join(PackFolder, "texts");

  PrivateCreate(BaseFolder, Builder, "languages.json", JSON.stringify(LanguageNames));

  for (let I = 0; I < LanguageNames.length; I++) {
    PrivateCreate(BaseFolder, Builder, `${LanguageNames[I]}.lang`, LanguageContent);
  }
}

function PrivateCreate(BaseFolder: string, Builder: TemplateBuilder, Name: string, Content: string): void {
  let uri = path.join(BaseFolder, Name);
  Builder.CreateFile(uri, Content);
}
