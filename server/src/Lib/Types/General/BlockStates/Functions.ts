export namespace BlockStates {
  export function IsStates(value: string): boolean {
    if (value.startsWith("[") && value.endsWith("]")) return true;

    return false;
  }
}
