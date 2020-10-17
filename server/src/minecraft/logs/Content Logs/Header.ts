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
import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver';

export interface ContentLogHeader {
	Time: string;
	Category: string;
	Severity: string;
	Message: string;
}

export function GetHeader(line: string): ContentLogHeader | undefined {
	let Match = line.match(/(\d{2}:\d{2}:\d{2})\[(\w+)\]\[(\w+)\]/);

	if (Match)
		if (Match.length >= 4) {
			let Out: ContentLogHeader = {
				Time: Match[1],
				Category: Match[2],
				Message: '',
				Severity: Match[3]
			};

			let Index = (Match.index ?? 0) + Match[0].length;
			Out.Message = line.slice(Index, line.length);

			return Out;
		}

	return undefined;
}

export function GetSeverity(header : ContentLogHeader) : DiagnosticSeverity {
	switch(header.Severity.toLowerCase()) {
		case 'warning':
			return DiagnosticSeverity.Warning;

		case 'error':
			return DiagnosticSeverity.Error;		
	}

	return DiagnosticSeverity.Error;
}

export function GetRange(Header : ContentLogHeader) : Range {
	let Out = EmptyRange;
	let LineSpec = Header.Message.match(/line (\d+)/);

	if (LineSpec && LineSpec.length >= 2){
		let Index = Number.parseInt(LineSpec[1]);
		Out.start.line = Index;
		Out.end.line = Index;
	}
	
	return Out;
}

export function CreateDiagnostics(Header : ContentLogHeader) : Diagnostic {
	return {
		message: Header.Message,
		range: GetRange(Header),
		severity:GetSeverity(Header),
	}
}