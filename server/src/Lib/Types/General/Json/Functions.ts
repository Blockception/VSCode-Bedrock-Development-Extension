/**
 *
 * @param value
 * @returns
 */
export function IsJson(value: string): boolean {
  let result = false;

  try {
    var obj = JSON.parse(value);

    if (obj) result = true;
  } catch (err) {}

  return result;
}
