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
import { WorkDoneProgress, WorkDoneProgressParams } from "vscode-languageserver";
import { Manager } from "../manager/Manager";

export class ProgressHandler {
  private Title: string;
  private value: number;
  private max: number;
  private reporter: WorkDoneProgress | undefined;
  private _done: boolean;

  constructor(Title: string, value: number = 0, max: number = 1, reporter: WorkDoneProgress | undefined = undefined) {
    this._done = false;
    this.Title = Title;
    this.value = value;
    this.max = max;

    this.setup(reporter);
  }

  /**
   * Returns true if the connection has been made
   */
  public IsSetup(): boolean {
    return this.reporter !== undefined;
  }

  /**
   *
   */
  public IsCanceled(): boolean {
    if (this.reporter) return true;

    return false;
  }

  /**
   *
   * @param value
   * @param update wheter or not to send an update to the client, default = true;
   */
  public setProgress(value: number, update: boolean = true): void {
    this.value = value;

    if (update) this.update();
  }

  /**
   *
   * @param value
   * @param update
   */
  public addProgress(value: number, update: boolean = true): void {
    this.value += value;

    if (update) this.update();
  }

  /**
   * Sets the maximum value fo the progress
   * @param value
   * @param update
   */
  public setMax(value: number, update: boolean = false): void {
    this.max = value;

    if (update) this.update();
  }

  /**
   *
   * @param value
   * @param update
   */
  public addMax(value: number, update: boolean = false): void {
    this.max += value;

    if (update) this.update();
  }

  /**
   * Updates the given values back to the client
   */
  public update() {
    this.reporter?.report(this.value / this.max);
  }

  /**
   * Marks the progress as done
   */
  public done() {
    this.reporter?.done();
    this._done = true;
    this.reporter = undefined;
  }

  /**
   * setups the connection
   */
  private setup(reporter: WorkDoneProgress | undefined) {
    if (reporter === undefined) {
      //has to request a token
      Manager.Connection.window.createWorkDoneProgress().then((x) => {
        if (this._done) {
          x.done();
        } else {
          this.reporter = x;
          this.reporter.begin(this.Title, this.value / this.max);
        }
      });

      return;
    }

    this.reporter = reporter;
    this.reporter.begin(this.Title, this.value / this.max);
  }

  public TaskStart(): void {
    this.addMax(1);
  }

  public TaskDone(): void {
    this.addProgress(1);
  }
}

export namespace ProgressHandler {
  export function Attach(token: WorkDoneProgressParams, Title: string, value: number = 0, max: number = 1): ProgressHandler {
    let reporter = Manager.Connection.window.attachWorkDoneProgress(token.workDoneToken);
    return new ProgressHandler(Title, value, max, reporter);
  }
}
