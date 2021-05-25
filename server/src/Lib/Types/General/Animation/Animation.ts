export interface Animation {
  [animation: string]: string;
}

export namespace Animation {
  /**
   *
   * @param animations
   * @param id
   * @returns
   */
  export function hasID(animations: Animation | undefined, id: string): boolean {
    if (animations === undefined) return false;

    const element = animations[id];

    return typeof element === "string";
  }
}
