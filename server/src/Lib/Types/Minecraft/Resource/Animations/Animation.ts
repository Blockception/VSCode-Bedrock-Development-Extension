export interface Animation {
  format_version: string;
  animations: any;
}

export namespace Animation {
  export function is(value: any): value is Animation {
    if (value && value.format_version && value.animations) return true;

    return false;
  }
}
