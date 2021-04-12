export function IsJson(value: string): boolean {
  if (value.startsWith("{") && value.endsWith("}")) return true;

  if (value.startsWith("[") && value.endsWith("]")) return true;

  return false;
}
