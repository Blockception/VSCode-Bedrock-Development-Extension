export type Animation = string | { [state: string]: string };
export type Transition = string | { [state: string]: string };

export interface State {
  on_entry?: string[];
  on_exit?: string[];
  transitions?: Transition[];
  animations?: Animation[];
}

export interface Controller {
  initial_state?: string;
  states?: {
    [state: string]: State;
  };
}

export interface AnimationController {
  format_version: string;
  animation_controllers: {
    [controller: string]: Controller;
  };
}

export namespace AnimationController {
  export function is(value: any): value is AnimationController {
    if (value && value.format_version && value.animation_controllers) return true;

    return false;
  }
}
