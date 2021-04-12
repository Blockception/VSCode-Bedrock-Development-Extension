export interface SingleAnimation {
  loop?: boolean | string;
  timeline?: {
    [timecode: string]: string;
  };
  animation_length?: number | string;
}

export interface Animation {
  format_version: string;
  animations: {
    [animation: string]: SingleAnimation;
  };
}

export namespace Animation {
  export function is(value: any): value is Animation {
    if (value && value.format_version && value.animations) return true;

    return false;
  }
}
