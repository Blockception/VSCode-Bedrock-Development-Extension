interface Value<T> {
  data: T;
  time: number;
}

export class DataCache<K, V> {
  private _data: Map<K, Value<V>>;
  private _maxdiff: number;

  constructor(max_timespan: number = DataCache.defaultTimespan) {
    this._data = new Map<K, Value<V>>();
    this._maxdiff = max_timespan;
  }

  get(key: K): V | undefined {
    const out = this._data.get(key);

    if (out) {
      //To old, then delete
      if (this.toOld(out.time)) {
        this._data.delete(key);
      } else {
        return out.data;
      }
    }

    return undefined;
  }

  getOrAdd(key: K, generate: (key: K) => V): V {
    let out = this.get(key);

    if (out) {
      return out;
    }

    out = generate(key);

    this.set(key, out);
    return out;
  }

  set(key: K, value: V): DataCache<K, V> {
    const tvalue: Value<V> = {
      data: value,
      time: Date.now(),
    };

    this._data.set(key, tvalue);
    return this;
  }

  clear() {
    this._data.clear();
  }

  private toOld(time: number): boolean {
    if (Date.now() - time > this._maxdiff) return true;

    return false;
  }
}

export namespace DataCache {
  //Every 5 minutes
  export const defaultTimespan: number = timespan(0, 30, 0);

  export function timespan(ms: number, seconds: number = 0, minutes: number = 0, hours: number = 0): number {
    minutes += hours * 60;
    seconds += minutes * 60;
    ms = seconds * 100;
    return ms;
  }
}
