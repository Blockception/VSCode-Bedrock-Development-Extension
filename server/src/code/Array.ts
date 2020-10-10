
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