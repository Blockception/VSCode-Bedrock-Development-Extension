import { CancellationToken, Emitter } from "vscode-languageserver-protocol";

export namespace Tokens {
  export function combine(first?: CancellationToken, second?: CancellationToken): CancellationToken {
    return new CombineToken(first, second);
  }
}

class CombineToken implements CancellationToken {
  private _onCancellationRequested: Emitter<any>;

  constructor(private first?: CancellationToken, private second?: CancellationToken) {
    this.isCancellationRequested = first?.isCancellationRequested || second?.isCancellationRequested || false;

    this._onCancellationRequested = new Emitter();
    this.first?.onCancellationRequested(this._onCancellation.bind(this));
    this.second?.onCancellationRequested(this._onCancellation.bind(this));
  }

  isCancellationRequested: boolean;

  get onCancellationRequested() {
    return this._onCancellationRequested.event;
  }

  private _onCancellation(e: any) {
    this.isCancellationRequested = this.first?.isCancellationRequested || this.second?.isCancellationRequested || false;
    this._onCancellationRequested.fire(e);
  }
}
