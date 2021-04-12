export function removeDuplicate<T>(items: T[]): T[] {
  let Length = items.length;
  let Out: T[] = [];

  for (let I = 0; I < Length; I++) {
    let Current = items[I];

    if (!Out.includes(Current)) {
      Out.push(Current);
    }
  }

  return Out;
}

export function DupeCheckAdd<T>(items: T[], item: T): void {
  if (!items.includes(item)) items.push(item);
}
