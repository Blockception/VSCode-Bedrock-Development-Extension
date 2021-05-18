//Check if the given value is a Range
export function IsRangeInteger(value: string): boolean {
  let match = value.match(/^([-\d]+\.\.[-\d]+|[-\d]+\.\.|\.\.[-\d]+)$/g);

  if (match == undefined) return false;

  return match.length > 0;
}

//Check if the given value is a Range
export function IsRangeNumber(value: string): boolean {
  let match = value.match(/^([\d\.]+\.\.[\d\.]+|[\d\.]+\.\.|\.\.[\d\.]+)$/g);

  if (match == undefined) return false;

  return match.length > 0;
}
