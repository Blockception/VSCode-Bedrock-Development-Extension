export interface ValidationData {
  tags?: ValidationDataStringLists;
  objectives?: ValidationDataStringLists;
}

export interface ValidationDataStringLists {
  valid?: string[] | undefined;
  invalid?: string[] | undefined;
}

export namespace ValidationData {
  export function is(value: any): value is ValidationData {
    if (!value) {
      return false;
    }

    if (value.tags) {
      if (ValidationDataStringLists.is(value.tags)) {
        return true;
      }
    }

    if (value.objectives) {
      if (ValidationDataStringLists.is(value.objectives)) {
        return true;
      }
    }

    return false;
  }

  export function createEmpty(): ValidationData {
    return {
      objectives: ValidationDataStringLists.create([], []),
      tags: ValidationDataStringLists.create([], []),
    };
  }
}

export namespace ValidationDataStringLists {
  export function is(value: any): value is ValidationDataStringLists {
    if (!value) return false;

    if (value.valid) {
      if (Array.isArray(value.valid)) {
        return true;
      }
    }

    if (value.invalid) {
      if (Array.isArray(value.invalid)) {
        return true;
      }
    }

    return false;
  }

  export function create(valid: string[] | undefined = undefined, invalid: string[] | undefined = undefined): ValidationDataStringLists {
    return { valid: valid, invalid: invalid };
  }

  export function merge(receiver: ValidationDataStringLists, data: ValidationDataStringLists): void {
    if (data.valid) {
      if (!receiver.valid) receiver.valid = [];

      receiver.valid.push(...data.valid);
    }

    if (data.invalid) {
      if (!receiver.invalid) receiver.invalid = [];

      receiver.invalid.push(...data.invalid);
    }
  }

  export function isValid(value: string, rules: ValidationDataStringLists): boolean {
    //Check if the value is whitelisted
    if (rules.valid) {
      for (let index = 0; index < rules.valid.length; index++) {
        const element = rules.valid[index];

        if (value !== element) {
          return false;
        }
      }
    }

    //Check if the value is blacklisted
    if (rules.invalid) {
      for (let index = 0; index < rules.invalid.length; index++) {
        const element = rules.invalid[index];

        if (value === element) {
          return false;
        }
      }
    }

    return true;
  }
}
