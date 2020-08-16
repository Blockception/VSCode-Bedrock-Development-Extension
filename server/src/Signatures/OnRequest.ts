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
import { SignatureHelp, SignatureHelpParams, Command } from 'vscode-languageserver';
import { GetDocument, IDocument } from '../code/include';
import { Position } from 'vscode-languageserver-textdocument';
import { Manager } from '../Manager';
import { CommandIntr } from '../minecraft/Commands/Command';
import { exec } from 'child_process';

export function OnSignatureRequest(params : SignatureHelpParams) : SignatureHelp {
	var pos = params.position;
	var doc = GetDocument(params.textDocument.uri, "bc-minecraft-mcfunction");

	var Line = doc.getLine(pos.line);
	var Command : CommandIntr = CommandIntr.parse(Line, pos);

	return ProvideSignature(Command);
}

function ProvideSignature(command : CommandIntr) : SignatureHelp {


}

function IsSubCommand(command : CommandIntr, character : number) : boolean {
	var Keyword = command.GetCommandKeyword();

	if (Keyword == 'execute'){
		if ()
	}

	return false;
}