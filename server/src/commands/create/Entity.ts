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
import { CreateFile, DeleteFile, ExecuteCommandParams, RenameFile, TextDocumentEdit, WorkspaceEdit } from 'vscode-languageserver/node';
import { Manager } from '../../manager/Manager';
import { Context, GetContextAsync } from './Context';
import { CreateFileFunction, GenerateSafeID, SendEdit } from './Functions';

const BehaviourTemplate = `{
  "format_version": "1.16.0",
  "minecraft:entity": {
    "description": {
      "identifier": "%ID%",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {
    },
    "components": {
    },
    "events": {
    }
  }
}`;

const ResourceTemplate = `{
  "format_version": "1.10.0",
  "minecraft:client_entity": {
    "description": {
      "identifier": "%ID%"
    }
  }
}`;


export function CreateEntity(arg: ExecuteCommandParams): void {
	if (!arg || arg.arguments === undefined || arg.arguments.length === 0) {
		return undefined;
	}

	GetContextAsync<ExecuteCommandParams>(arg, CreateEntityRequest);
}

export function CreateBPEntity(arg: ExecuteCommandParams): void {
	if (!arg || arg.arguments === undefined || arg.arguments.length === 0) {
		return undefined;
	}

	GetContextAsync<ExecuteCommandParams>(arg, CreateEntityBPRequest);
}

export function CreateRPEntity(arg: ExecuteCommandParams): void {
	if (!arg || arg.arguments === undefined || arg.arguments.length === 0) {
		return undefined;
	}

	GetContextAsync<ExecuteCommandParams>(arg, CreateEntityRPRequest);
}


function CreateEntityRequest(Context: Context, data: ExecuteCommandParams): void {
	if (data === undefined || data.arguments === undefined) return;
	if (Context === undefined) return;

	let Edits: WorkspaceEdit[] = [];

	for (let I = 0; I < data.arguments.length; I++) {
		let item = data.arguments[I];

		if (item && typeof (item) === 'string') {
			CreateEntityFiles(Context, item, Edits);
		}
	}
}

function CreateEntityBPRequest(Context: Context, data: ExecuteCommandParams): void {
	if (data === undefined || data.arguments === undefined) return;
	if (Context === undefined) return;

	let Edits: WorkspaceEdit[] = [];

	for (let I = 0; I < data.arguments.length; I++) {
		let item = data.arguments[I];

		if (item && typeof (item) === 'string') {
			CreateEntityBPFile(Context, item, Edits);
		}
	}
}

function CreateEntityRPRequest(Context: Context, data: ExecuteCommandParams): void {
	if (data === undefined || data.arguments === undefined) return;
	if (Context === undefined) return;

	let Edits: WorkspaceEdit[] = [];

	for (let I = 0; I < data.arguments.length; I++) {
		let item = data.arguments[I];

		if (item && typeof (item) === 'string') {
			CreateEntityRPFile(Context, item, Edits);
		}
	}
}


function CreateEntityFiles(Data: Context, ID: string, Edits: WorkspaceEdit[]): void {
	let SafeID = GenerateSafeID(ID);

	let dChange: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[] = [];
	let Edit: WorkspaceEdit = {
		documentChanges: dChange
	};

	CreateFileFunction(Data.BehaviorPack + 'entities/' + SafeID + '.json', BehaviourTemplate.replace(/%ID%/gi, ID), dChange);
	CreateFileFunction(Data.ResourcePack + 'entity/' + SafeID + 'entity.json', ResourceTemplate.replace(/%ID%/gi, ID), dChange);

	SendEdit(Edit);
}

function CreateEntityBPFile(Data: Context, ID: string, Edits: WorkspaceEdit[]): void {
	let SafeID = GenerateSafeID(ID);

	let dChange: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[] = [];
	let Edit: WorkspaceEdit = {
		documentChanges: dChange
	};

	CreateFileFunction(Data.BehaviorPack + 'entities/' + SafeID + '.json', BehaviourTemplate.replace(/%ID%/gi, ID), dChange);

	SendEdit(Edit);
}

function CreateEntityRPFile(Data: Context, ID: string, Edits: WorkspaceEdit[]): void {
	let SafeID = GenerateSafeID(ID);

	let dChange: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[] = [];
	let Edit: WorkspaceEdit = {
		documentChanges: dChange
	};

	CreateFileFunction(Data.ResourcePack + 'entity/' + SafeID + 'entity.json', ResourceTemplate.replace(/%ID%/gi, ID), dChange);

	SendEdit(Edit);
}