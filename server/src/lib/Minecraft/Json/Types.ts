export function IsBool(value: string) {
  return value === "true" || value === "false";
}

export function IsNumber(value: string) {
  return !isNaN(Number(value));
}

export function SantizeValue(value: string) {
  if (IsBool(value) || IsNumber(value)) {
    return value;
  }

  return `"${value}"`;
}