export interface type_family {
  family: string[];
}

export namespace type_family {
  export function is(value: any): value is type_family {
    if (value && value.family && Array.isArray(value.family)) return true;

    return false;
  }
}
