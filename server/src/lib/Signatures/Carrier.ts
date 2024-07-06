import { SignatureInformation } from "vscode-languageserver";

/**
 * 
 */
export interface SignatureCarrier {
  /**
   * 
   */
  __signature?: SignatureInformation;
}

/**
 * 
 */
export namespace SignatureCarrier {
  /**
   * 
   * @param value 
   * @param generate 
   * @returns 
   */
  export function get<T>(value: T, generate: (value: T) => SignatureInformation): SignatureInformation {
    const temp = <SignatureCarrier>value;

    if (temp.__signature) {
      return temp.__signature;
    }

    const out = generate(value);
    temp.__signature = out;
    return out;
  }
}
