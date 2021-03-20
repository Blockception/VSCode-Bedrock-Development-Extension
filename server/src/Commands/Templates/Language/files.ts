/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
	 list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
	 this list of conditions and the following disclaimer in the documentation
	 and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
	 contributors may be used to endorse or promote products derived from
	 this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
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
