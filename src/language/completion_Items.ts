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

import * as vscode from 'vscode';
import * as constants from '../constants';
import { createCompletionItem } from '../general/include';

export function activate(context: vscode.ExtensionContext) {
    console.log("activating language completion");
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            constants.LanguageIdentifier, 
            new LanguageCompletionItemProvider(), 
            '\n', ' ', '=', '#')
    );
}


class LanguageCompletionItemProvider implements vscode.CompletionItemProvider {

    public StartItems : vscode.CompletionItem[];
    public WhenKey : vscode.CompletionItem[];
    public WhenValue : vscode.CompletionItem[];

    constructor(){
        let Comment = createCompletionItem('##', 'Comment', 'Adds a Comment to the language file', vscode.CompletionItemKind.Snippet);
        this.WhenKey = [ createCompletionItem('=', '=', '', vscode.CompletionItemKind.Operator) ]

        this.StartItems = [
            createCompletionItem('## region <Region Name>\n\n## endregion', 'Region', 'Adds a region to the language file', vscode.CompletionItemKind.Snippet),
            Comment
        ]

        this.WhenValue = [
            Comment,
            createCompletionItem('§0', 'Colour: Black', 'Colours the text black', vscode.CompletionItemKind.Color),
            createCompletionItem('§1', 'Colour: Dark Blue', 'Colours the text dark blue', vscode.CompletionItemKind.Color),
            createCompletionItem('§2', 'Colour: Dark Green', 'Colours the text dark green', vscode.CompletionItemKind.Color),
            createCompletionItem('§3', 'Colour: Dark Aqua', 'Colours the text dark aqua', vscode.CompletionItemKind.Color),
            createCompletionItem('§4', 'Colour: Dark Red', 'Colours the text dark red', vscode.CompletionItemKind.Color),
            createCompletionItem('§5', 'Colour: Dark Purple', 'Colours the text dark purple', vscode.CompletionItemKind.Color),
            createCompletionItem('§6', 'Colour: Gold', 'Colours the text gold', vscode.CompletionItemKind.Color),
            createCompletionItem('§7', 'Colour: Gray', 'Colours the text gray', vscode.CompletionItemKind.Color),
            createCompletionItem('§8', 'Colour: Dark Gray', 'Colours the text dark gray', vscode.CompletionItemKind.Color),
            createCompletionItem('§9', 'Colour: Blue', 'Colours the text blue', vscode.CompletionItemKind.Color),

            createCompletionItem('§a', 'Colour: Green', 'Colours the text green', vscode.CompletionItemKind.Color),
            createCompletionItem('§b', 'Colour: Aqua', 'Colours the text aqua', vscode.CompletionItemKind.Color),
            createCompletionItem('§c', 'Colour: Red', 'Colours the text red', vscode.CompletionItemKind.Color),
            createCompletionItem('§d', 'Colour: Light Purple', 'Colours the text light purple', vscode.CompletionItemKind.Color),
            createCompletionItem('§e', 'Colour: Yellow', 'Colours the text yellow', vscode.CompletionItemKind.Color),
            createCompletionItem('§f', 'Colour: White', 'Colours the text white', vscode.CompletionItemKind.Color),

            createCompletionItem('§k', 'Format: Obfuscated', 'Makes your text random characters', vscode.CompletionItemKind.Color),
            createCompletionItem('§l', 'Format: Bold', 'Makes your text bold', vscode.CompletionItemKind.Color),
            createCompletionItem('§m', 'Format: Strikethrough', 'Puts a line through your text', vscode.CompletionItemKind.Color),
            createCompletionItem('§n', 'Format: Underline', 'Puts a line under your text', vscode.CompletionItemKind.Color),
            createCompletionItem('§o', 'Format: Italic', 'Makes your text italic', vscode.CompletionItemKind.Color),
            createCompletionItem('§r', 'Format: Reset', 'Resets the color and format of your text', vscode.CompletionItemKind.Color),
        ]
    }

    async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): Promise<vscode.CompletionItem[] | vscode.CompletionList> {
        return new Promise<vscode.CompletionItem[] | vscode.CompletionList>((resolve, reject)=>{
            resolve(this.internalProvideCompletionitems(document, position));
        });
    }

    private internalProvideCompletionitems(document: vscode.TextDocument, position: vscode.Position) : vscode.CompletionItem[] | vscode.CompletionList | undefined {
        if (position.character == 0){
            //Comments
            return this.StartItems;
        }

        let Line = document.lineAt(position.line);
        let Text = Line.text;

        if (Text.startsWith('#')){
            return undefined;
        }

        let Index = Text.indexOf('=');

        //if no = is found
        if (Index < 0 || position.character < Index){
            return this.WhenKey;
        }

        Index = Text.indexOf('#');

        //When not in the comments
        if (Index < 0 || position.character < Index){
            return this.WhenValue;
        }

        return undefined;
    }
}