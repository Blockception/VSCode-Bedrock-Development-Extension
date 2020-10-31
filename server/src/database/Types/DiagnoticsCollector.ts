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
import { Diagnostic, PublishDiagnosticsParams } from 'vscode-languageserver'
import { GetFilepath } from '../../code/Url';
import { Manager } from '../../manager/Manager';

export class DiagnosticCollector {
	private Data: Map<string, Diagnostic[]>;

	constructor() {
		this.Data = new Map<string, Diagnostic[]>();
	}

	public SetErrors(uri: string, errors: Diagnostic[]): void {
		this.Data.set(uri, errors);
		this.sendData(uri, errors);
	}

	public GetErrors(uri: string): Diagnostic[] | undefined {
		return this.Data.get(uri);
	}

	public RemoveFile(uri: string): void {
		this.Data.delete(uri);
		this.sendData(uri, []);
	}

	private sendData(uri: string, errors: Diagnostic[]): void {
		let Out: PublishDiagnosticsParams = {
			uri: GetFilepath(uri),
			diagnostics: errors,
		};

		Manager.Connection.sendDiagnostics(Out);
	}
}