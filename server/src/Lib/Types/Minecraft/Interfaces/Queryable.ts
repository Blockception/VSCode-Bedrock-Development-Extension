export interface Queryable {
  MatchQuery(query: string): boolean;
}

export namespace Queryable {
  export function is(value: any): value is Queryable {
    return value?.MatchQuery !== undefined;
  }
}
