/** */
export namespace Character {
  export const Character_a: number = "a".charCodeAt(0);
  export const Character_z: number = "z".charCodeAt(0);
  export const Character_A: number = "A".charCodeAt(0);
  export const Character_Z: number = "Z".charCodeAt(0);
  export const Character_0: number = "0".charCodeAt(0);
  export const Character_9: number = "9".charCodeAt(0);

  export const Character_underscore: number = "_".charCodeAt(0);
  export const Character_dash: number = "-".charCodeAt(0);

  /** */
  export function IsLetter(char: string): boolean {
    var code = char.charCodeAt(0);

    if (code >= Character_a && code <= Character_z) return true;
    if (code >= Character_A && code <= Character_Z) return true;

    return false;
  }

  /** */
  export function IsLetterCode(char: number): boolean {
    if (char >= Character_a && char <= Character_z) return true;
    if (char >= Character_A && char <= Character_Z) return true;

    return false;
  }

  /** */
  export function IsNumber(char: string): boolean {
    var code = char.charCodeAt(0);

    if (code >= Character_0 && code <= Character_9) return true;

    return false;
  }

  /** */
  export function IsNumberCode(char: number): boolean {
    if (char >= Character_0 && char <= Character_9) return true;

    return false;
  }
}
