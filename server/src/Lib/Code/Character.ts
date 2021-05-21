export namespace Character {
  const Character_a = "a".charCodeAt(0);
  const Character_z = "z".charCodeAt(0);
  const Character_A = "A".charCodeAt(0);
  const Character_Z = "Z".charCodeAt(0);
  const Character_0 = "0".charCodeAt(0);
  const Character_9 = "9".charCodeAt(0);

  export function IsLetter(char: string): boolean {
    var code = char.charCodeAt(0);

    if (code >= Character_a && code <= Character_z) return true;
    if (code >= Character_A && code <= Character_Z) return true;

    return false;
  }

  export function IsNumber(char: string): boolean {
    var code = char.charCodeAt(0);

    if (code >= Character_0 && code <= Character_9) return true;

    return false;
  }
}
