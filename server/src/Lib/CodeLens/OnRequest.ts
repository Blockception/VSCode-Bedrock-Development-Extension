import { CodeLens, CodeLensParams } from "vscode-languageserver";
import { CodeLensBuilder } from "./Builder";

/**
 *
 * @param params
 * @returns
 */
export async function OnCodeLensRequestAsync(params: CodeLensParams): Promise<CodeLens[]> {
  return new Promise<CodeLens[]>((resolve, reject) => {
    resolve(OnCodeLensRequest(params));
  });
}

/**
 *
 * @param params
 * @returns
 */
export function OnCodeLensRequest(params: CodeLensParams): CodeLens[] {
  let Builder = new CodeLensBuilder(params);

  //Nothing

  return Builder.out;
}
