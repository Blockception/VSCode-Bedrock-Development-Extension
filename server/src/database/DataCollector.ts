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
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Identifiable } from '../minecraft/Interfaces/Identifiable';

export interface DataCollectorIO {
	/**
	 * Removes any data from the associated file
	 * @param uri The filepath uri used
	 */
	DeleteFile(uri: string): void;

	/**
	 * Delete all files with given folder
	 * @param uri The folder uri to delete
	 */
	DeleteFolder(uri: string): void;

	/**
	 * Clear all data;
	 */
	Clear(): void;
}

export class DataCollector<T> implements DataCollectorIO {
	private data: Map<string, T>;

	constructor() {
		this.data = new Map<string, T>();
	}

	/**
	 * Retrieves stored data that has been stored under the given file
	 * @param uri 
	 */
	public GetFromFile(uri: string): T | undefined {
		return this.data.get(uri);
	}

	/**
	 * Sets the stored data from the given file
	 */
	public SetFromFile(uri: string, value: T): void {
		this.data.set(uri, value);
	}

	/**
	 * Removes any data from the associated file
	 * @param uri The filepath uri used
	 */
	public DeleteFile(uri: string): void {
		this.data.delete(uri);
	}

	/**
	 * Delete all files with given folder
	 * @param uri The folder uri to delete
	 */
	public DeleteFolder(uri: string): void {
		let Keys: string[] = [];

		this.data.forEach((v, k) => {
			if (k.startsWith(uri)) {
				Keys.push(k);
			}
		});

		Keys.forEach(k => this.data.delete(k));
	}

	/**
	 * Clear all data;
	 */
	public Clear(): void {
		this.data.clear();
	}

	/**
	 * Loops over all the data in the storage
	 * @param callback 
	 */
	public ForEach(callback: (value: T) => void): void {
		this.data.forEach((v, k) => callback(v));
	}

	/**
	 * Retrieves all the data
	 */
	public GetAll(): T[] {
		let Out: T[] = [];

		this.data.forEach((v, k) => Out.push(v));

		return Out;
	}

	/**
	 * 
	 */
	public Update(uri : string, value : T | undefined) {
		if (value){
			this.SetFromFile(uri, value);
		}
		else{
			this.DeleteFile(uri);
		}
	}
}

export class IdentifiableDataCollection<T extends Identifiable> extends DataCollector<T> {
	/**
	 * 
	 * @param Identifier 
	 */
	public GetFromID(Identifier: string): T | undefined {
		this.ForEach(x => {
			if (Identifier === Identifier)
				return x;
		});

		return undefined;
	}
}