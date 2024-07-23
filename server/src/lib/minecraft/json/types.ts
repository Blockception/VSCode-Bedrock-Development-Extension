export function isBool(value: string) {
  return value === "true" || value === "false";
}

export function isNumber(value: string) {
  return !isNaN(Number(value));
}

/**
 * Sanitizes the values as json values, numbers, boolean get left alone. while other get converted to string
 * @param value 
 * @returns 
 */
export function santizeValue(value: string) {
  if (isBool(value) || isNumber(value)) {
    return value;
  }

  return `"${value}"`;
}
