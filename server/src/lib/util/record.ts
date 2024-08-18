export function entries<U extends object, K extends keyof U>(data: U | undefined, callbackfn: (key: K, value: U[K]) => void): void {
  if (data === undefined) return;
  const keys = Object.keys(data) as K[];

  keys.forEach((k) => callbackfn(k, data[k]));
}