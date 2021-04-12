/**
 * Check if the given two objects are equal to each other an value
 * @param A The first object
 * @param B The second object
 */
export function IsEqual(A: any, B: any): boolean {
  let aProperties = Object.getOwnPropertyNames(A);
  let bProperties = Object.getOwnPropertyNames(B);
  let Length = aProperties.length;

  if (aProperties.length != bProperties.length) {
    return false;
  }

  for (let I = 0; I < Length; I++) {
    let name = aProperties[I];

    if (A[name] !== B[name]) {
      return false;
    }
  }
  return true;
}
