export interface FormatVersion {
  format_version: string;
}

export namespace FormatVersion {
  export function is(value: any): value is FormatVersion {
    if (value && value.format_version) {
      return true;
    }

    return false;
  }
}
