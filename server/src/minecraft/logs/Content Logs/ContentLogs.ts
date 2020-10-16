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
import { S_IWOTH } from 'constants';
import { existsSync, fstat, statSync } from 'fs';
import { Diagnostic } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { GetFilename } from '../../../code/File';
import { GetProjectData, ProjectData } from '../../../code/ProjectData';
import { DocumentReader } from '../../../code/Reader';
import { UniformUrl } from '../../../code/Url';
import { Manager } from '../../../Manager';
import { GeneralDataType } from '../../format/General Data Type';
import { ContentError, CreateErrors } from './Errors';
import { GetHeader, ContentLogHeader, CreateDiagnostics } from './Header';

export function ProcessContentLog(doc: TextDocument): void {
	let PD = GetProjectData();
	PD.then((PD) => PrivateProcessContentLog(PD, doc));
}

function PrivateProcessContentLog(PD: ProjectData, doc: TextDocument): void {
	console.log('Reading content log: ' + GetFilename(doc.uri))
	let Lines: ContentLogHeader[] = [];

	let Reader = new DocumentReader(doc);

	while (Reader.IsReading()) {
		let Line = Reader.ReadLine().trim();

		if (Line === '')
			continue;

		let Header = GetHeader(Line);

		if (Header) {
			Lines.push(Header);
		}
	}

	console.log('Found: ' + Lines.length + ' lines');
	let Errors = CreateErrors(Lines);

	for (let I = 0; I < Errors.length; I++) {
		let Err = Errors[I];
		let Filepath = UniformUrl(FindFile(PD, Err));
		let diags: Diagnostic[] = [];

		diags.push(CreateDiagnostics(Err.Header));

		Err.Suberrors.forEach(err => diags.push(CreateDiagnostics(err)));

		//Send the information
		Manager.Connection.sendDiagnostics({ diagnostics: diags, uri: DiagFilepath(PD, Filepath) });
	}
}

function FindFile(PD: ProjectData, Err: ContentError): string {
	let F: string | undefined;

	switch (Err.Type) {
		case GeneralDataType.behaviour_pack:
			F = Check(PD.BehaviourPackFolders, Err.Filepath);
			if (F) { return F; }
			break;

		case GeneralDataType.resource_pack:
			F = Check(PD.ResourcePackFolders, Err.Filepath);
			if (F) { return F; }
			break;

		case GeneralDataType.world:
			F = Check(PD.WorldFolders, Err.Filepath);
			if (F) { return F; }
			break;
	}

	F = Check(PD.BehaviourPackFolders, Err.Filepath);
	if (F) { return F; }

	F = Check(PD.ResourcePackFolders, Err.Filepath);
	if (F) { return F; }

	F = Check(PD.WorldFolders, Err.Filepath);
	if (F) { return F; }

	return 'File not found in workspace!!!';
}

function DiagFilepath(PD : ProjectData, filepath : string) : string {
	PD.WorldFolders.forEach(ws=>{
		filepath = filepath.replace(ws, '');
	});

	return filepath;
}

function Check(folder: string[], pattern: string): string | undefined {
	for (let index = 0; index < folder.length; index++) {
		let dir = folder[index];
		let Filepath = dir + pattern;

		if (existsSync(Filepath)) {
			return Filepath;
		}
	}

	return undefined;
}