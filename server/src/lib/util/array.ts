type Primitive = string | number | boolean;

/**
 *
 * @param items
 * @returns
 */
export function removeDuplicate<T extends Primitive>(items: T[]): T[] {
  const length = items.length;
  const result: T[] = [];

  for (let I = 0; I < length; I++) {
    const current = items[I];

    if (!result.includes(current)) {
      result.push(current);
    }
  }

  return result;
}

/**
 *
 * @param items
 * @param item
 */
export function DupeCheckAdd<T extends Primitive>(items: T[], item: T): void {
  if (!items.includes(item)) items.push(item);
}
