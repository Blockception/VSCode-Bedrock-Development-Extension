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

import * as vscode from "vscode";
import * as fs from "fs";
import { CompletionItemProvider, CompletionItemManager } from "../CompletionItemManager";
import { SyntaxItem, createCompletionItem } from "../../../general/include";

export class FunctionCommandCompletionProvider implements CompletionItemProvider {

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.CompletionItem[] | undefined {
        //Already has completion text
        if (Item.Child != undefined)
            return undefined;

        var receiver = new Array<vscode.CompletionItem>();

        var filepath = document.uri.fsPath;
        var index = filepath.indexOf("\\functions\\");

        if (index > 0) {
            var folder = filepath.substring(0, index + 11);

            this.explore(folder, folder, receiver);
        }

        return receiver;
    }

    explore(baseFolder: string, currentFolder: string, receiver: vscode.CompletionItem[]) {
        var files = fs.readdirSync(currentFolder);
        var Directories = new Array<string>();

        for (let index = 0; index < files.length; index++) {
            var file = currentFolder + files[index];

            if (fs.lstatSync(file).isDirectory()) {
                Directories.push(file + "\\");
            }
            else {
                var newfile = file.replace(baseFolder, "").replace(".mcfunction", "");
                newfile = newfile.replace(/\\/g, '/');
                if (newfile.indexOf(" ") > -1)
                    newfile = '"' + newfile + '"';

                receiver.push(createCompletionItem(newfile, newfile, "The file path.", vscode.CompletionItemKind.File));
            }
        }

        Directories.forEach(x => this.explore(baseFolder, x, receiver));
    }
}