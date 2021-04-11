export interface AnimationController {
  format_version: string;
  animation_controllers: any;
}

export namespace AnimationController {
  export function is(value: any): value is AnimationController {
    if (value && value.format_version && value.animation_controllers) return true;

    return false;
  }
}
