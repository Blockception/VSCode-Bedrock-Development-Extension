type Primitive = string | number | boolean;

/**
 *
 * @param items
 * @returns
 */
export function removeDuplicate<T extends Primitive>(items: T[]): T[] {
  const Length = items.length;
  let Out: T[] = [];

  for (let I = 0; I < Length; I++) {
    const Current = items[I];

    if (!Out.includes(Current)) {
      Out.push(Current);
    }
  }

  return Out;
}

/**
 *
 * @param items
 * @param item
 */
export function DupeCheckAdd<T extends Primitive>(items: T[], item: T): void {
  if (!items.includes(item)) items.push(item);
}
