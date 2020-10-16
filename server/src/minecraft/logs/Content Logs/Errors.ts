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
import { DetectGeneralDataType } from '../../format/detection';
import { GeneralDataType } from '../../format/General Data Type';
import { ContentLogHeader } from './Header';

export interface ContentError {
	Header: ContentLogHeader;
	Filepath: string;
	Suberrors: ContentLogHeader[];
	Type: GeneralDataType;
}


export function FindFilepath(error: ContentError): string {
	let msg = error.Header.Message;

	let FunctionMatch = msg.match(/functions.*\.mcfunction/);

	if (FunctionMatch) {
		return FunctionMatch[0];
	}
	
	FunctionMatch = msg.match(/Function ([\w\/]+) failed/);

	if (FunctionMatch) {
		return 'functions/' + FunctionMatch[1];
	}

	let WorldMatch = msg.match(/.:.*minecraftWorlds.*json/);

	if (WorldMatch) {
		return WorldMatch[0];
	}
	return 'unknown';
}

export function CreateErrors(Headers: ContentLogHeader[]): ContentError[] {
	let Errors: ContentError[] = [];
	let Current: ContentError | undefined;

	for (let I = 0; I < Headers.length; I++) {
		let H = Headers[I];

		if (H.Message.includes('Error on line')) {
			if (Current != undefined) {
				Current.Suberrors.push(H);
			}
		} else {
			Current = {
				Filepath: '',
				Header: H,
				Suberrors: [],
				Type: GeneralDataType.unknown
			}

			Current.Filepath = FindFilepath(Current);
			Current.Type = DetectGeneralDataType(Current.Filepath);
			TrimFilepath(Current);
			Errors.push(Current);
		}
	}

	return Errors;
}

function TrimFilepath(Error: ContentError): void {
	if (TrimItemFilepath(Error, 'resource_pack', 15)) return;
	if (TrimItemFilepath(Error, 'behavior_packs', 15)) return;

	if (TrimItemFilepath(Error, 'bp')) return;
	if (TrimItemFilepath(Error, 'BP')) return;
	
	if (TrimItemFilepath(Error, 'rp')) return;
	if (TrimItemFilepath(Error, 'RP')) return;
}

function TrimItemFilepath(Error: ContentError, pattern: string, offset: number | undefined = undefined): boolean {
	if (offset == undefined)
		offset = pattern.length;

	let Filepath = Error.Filepath;
	let Index = Filepath.indexOf(pattern);

	if (Index > -1) {
		let Temp = Filepath.indexOf('/', offset);

		if (Temp > -1) {
			Error.Filepath = Filepath.slice(Temp, Filepath.length);
			return true;
		}
	}

	return false;
}