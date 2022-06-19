/**
 * Check if the given two objects are equal to each and compares the values of each of their properties
 * @param A The first object
 * @param B The second object
 */
export function IsEqual(A: any, B: any): boolean {
  const aProperties = Object.getOwnPropertyNames(A);
  const bProperties = Object.getOwnPropertyNames(B);
  const Length = aProperties.length;

  if (aProperties.length != bProperties.length) {
    return false;
  }

  for (let I = 0; I < Length; I++) {
    const name = aProperties[I];

    if (A[name] !== B[name]) {
      return false;
    }
  }
  return true;
}
