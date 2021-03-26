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
import { ExecuteCommandParams, TextDocumentEdit, TextEdit } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { GetDocument } from "../../Code/Document";
import { Database } from "../../Database/Database";
import { Manager } from "../../Manager/include";

export function AddAllItems(params: ExecuteCommandParams): any {
  let args = params.arguments;

  if (args) {
    let uri = args[0];

    if (uri !== "") {
      let doc = GetDocument(uri);

      if (doc) {
        let builder = new TextEditBuilder(doc);

        Database.Data.Behaviourpack.Entities.ForEach((entity) => {
          let id = Safe(entity.Identifier);

          builder.Add("entity." + entity.Identifier + ".name", id, "Entity: " + entity.Identifier);
          builder.Add("item.spawn_egg.entity." + entity.Identifier + ".name", "Spawn " + id, "Spawn egg for entity: " + entity.Identifier);
        });
        Database.Data.Behaviourpack.Items.ForEach((data) => {
          let id = Safe(data.Identifier);

          builder.Add("item." + data.Identifier + ".name", id, "Item: " + data.Identifier);
        });
        Database.Data.Behaviourpack.Blocks.ForEach((data) => {
          let id = Safe(data.Identifier);

          builder.Add("tile." + data.Identifier + ".name", id, "Block: " + data.Identifier);
        });

        let edit = TextEdit.insert(doc.positionAt(builder.textdoc.length), builder.out);

        Manager.Connection.workspace.applyEdit({
          edit: { documentChanges: [TextDocumentEdit.create({ uri: doc.uri, version: doc.version }, [edit])] },
        });
      }
    }
  }

  return undefined;
}

function Safe(id: string): string {
  let index = id.indexOf(":");
  if (index > -1) {
    return id.substring(index + 1, id.length).trim();
  }

  return id;
}

class TextEditBuilder {
  public out: string;
  readonly textdoc: string;

  constructor(doc: TextDocument) {
    this.out = "";
    this.textdoc = doc.getText();
  }

  Add(Key: string, Value: string, Comment: string | undefined = undefined): void {
    let Temp = Key + "=";
    if (this.textdoc.includes(Temp)) return;

    Temp += Value;

    if (Comment) {
      Temp += "\t## " + Comment;
    }

    this.out += Temp + "\n";
  }
}
