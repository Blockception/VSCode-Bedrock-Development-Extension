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
import { Location } from 'vscode-languageserver';
import { Identifiable } from "../minecraft/Interfaces/Identifiable";
import { Locatable } from "../minecraft/Interfaces/include";
import { DataCollectorIO } from './Interface/DataCollectorIO';
import { ReferenceFinder } from './Interface/ReferenceFinder';

export class DataCollector<T extends Identifiable & Locatable> implements DataCollectorIO, ReferenceFinder {
  /**
   * Stores identifier, value
   */
  private data: Map<string, T>;

  constructor() {
    this.data = new Map<string, T>();
  }

  /**
   * Retrieves stored data that has been stored under the given file
   * @param uri
   */
  public GetFromFile(uri: string): T[] | undefined {
    let Out: T[] = [];

    this.data.forEach((value, ID) => {
      if (value.Location.uri === uri) Out.push(value);
    });

    return Out;
  }

  /**
   * Removes any data from the associated file
   * @param uri The filepath uri used
   */
  public DeleteFile(uri: string): void {
    let Keys: string[] = [];

    this.data.forEach((value, ID) => {
      if (value.Location.uri === uri) Keys.push(ID);
    });

    Keys.forEach((k) => this.data.delete(k));
  }

  /**
   *
   * @param ID
   */
  public DeleteID(ID: string): void {
    this.data.delete(ID);
  }

  /**
   * Delete all files with given folder
   * @param uri The folder uri to delete
   */
  public DeleteFolder(uri: string): void {
    let Keys: string[] = [];

    this.data.forEach((value, ID) => {
      if (value.Location.uri.startsWith(uri)) Keys.push(ID);
    });

    Keys.forEach((k) => this.data.delete(k));
  }

  /**
   * Clear all data;
   */
  public Clear(): void {
    this.data.clear();
  }

  /**
   *
   * @param Identifier
   */
  public GetFromID(Identifier: string): T | undefined {
    let Item = this.data.get(Identifier);

    return Item;
  }

  public Set(value: T): void {
    this.data.set(value.Identifier, value);
  }

  /**
   * Loops over all the data in the storage
   * @param callback
   */
  public ForEach(callback: (value: T) => void): void {
    this.data.forEach((v, k) => callback(v));
  }

  /**
   * Activates the given function on each object that matches the given
   * @param Identifier
   * @param callback
   */
  public ForEachID(Identifier: string, callback: (value: T) => void): void {
    let Item = this.GetFromID(Identifier);

    if (Item) {
      callback(Item);
    }
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
  public Update(value: T | undefined, uri: string | undefined = undefined) {
    if (uri) this.DeleteFile(uri);

    if (value) {
      this.Set(value);
    }
  }

  /**
   * 
   * @param query 
   * @param receiver 
   */
  public FindReference(query: string, receiver: Location[]): void {
    for (let [key, value] of this.data) {
      if (value.Identifier.includes(query)) {
        receiver.push(value.Location);
      }
    }
  }
}
