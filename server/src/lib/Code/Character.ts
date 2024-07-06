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
  export const Character_forwardslash: number = "/".charCodeAt(0);
  export const Character_column: number = ":".charCodeAt(0);
  export const Character_dot: number = ".".charCodeAt(0);

  /**Tests if the first character of the provide string is a letter
   * @param char The string to test the first character from
   * @returns true or false*/
  export function IsLetter(char: string): boolean {
    var code = char.charCodeAt(0);

    if (code >= Character_a && code <= Character_z) return true;
    if (code >= Character_A && code <= Character_Z) return true;

    return false;
  }

  
  /**Tests if the first character of the provide string is an uppercase letter
   * @param char The string to test the first character from
   * @returns true or false*/
  export function IsUppercase(char: string): boolean {
    var code = char.charCodeAt(0);

    if (code >= Character_A && code <= Character_Z) return true;

    return false;
  }

  /**Tests if the character code is a letter
   * @param char the character code is a letter
   * @returns true or false*/
  export function IsLetterCode(char: number): boolean {
    if (char >= Character_a && char <= Character_z) return true;
    if (char >= Character_A && char <= Character_Z) return true;

    return false;
  }

  /**Tests if the first character is a number
   * @param char the character code is a letter
   * @returns true or false*/
  export function IsNumber(char: string): boolean {
    var code = char.charCodeAt(0);

    if (code >= Character_0 && code <= Character_9) return true;

    return false;
  }

  /**Tests if the character code is a number
   * @param char the character code is a letter
   * @returns true or false*/
  export function IsNumberCode(char: number): boolean {
    if (char >= Character_0 && char <= Character_9) return true;

    return false;
  }
}
