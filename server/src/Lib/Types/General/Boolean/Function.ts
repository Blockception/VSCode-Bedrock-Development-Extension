export function IsBoolean(value: string): boolean {
  switch (value) {
    case "True":
    case "true":
    case "False":
    case "false":
      return true;

    default:
      return false;
  }
}
