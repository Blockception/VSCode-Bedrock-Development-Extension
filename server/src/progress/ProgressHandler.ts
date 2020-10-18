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
import { Disposable, ProgressType } from 'vscode-languageserver';
import { Manager } from '../manager/Manager';

export class ProgressHandler implements Disposable {
	carrier: Disposable | undefined;
	token: string;

	progress : number;

	constructor(token: string) {
		this.token = token;
		this.carrier = undefined;
		this.progress = 0;
	}


	dispose(): void {
		this.carrier?.dispose();
	}

	NotificationHandler(params : number): void {
		this.progress = params;
	}

	sendProgress(value : number) : void {
		Manager.Connection.sendProgress(new ProgressType<number>(), this.token, value);
	}
}

export namespace ProgressHandler {
	export function create(token: string): ProgressHandler {

		let Out: ProgressHandler = new ProgressHandler(token);

		let carrier = Manager.Connection.onProgress(new ProgressType<number>(), token, Out.NotificationHandler)
		Out.carrier = carrier;


		return Out;
	}
}