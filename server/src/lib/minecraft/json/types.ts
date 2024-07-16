export function isBool(value: string) {
  return value === "true" || value === "false";
}

export function isNumber(value: string) {
  return !isNaN(Number(value));
}

export function santizeValue(value: string) {
  if (isBool(value) || isNumber(value)) {
    return value;
  }

  return `"${value}"`;
}