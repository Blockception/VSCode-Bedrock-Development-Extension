import { Definition, DefinitionLink, ImplementationParams, Location } from "vscode-languageserver";
import { onDefinition } from "../references/on-definitions";

export async function onImplementationRequestAsync(
  params: ImplementationParams
): Promise<Definition | DefinitionLink[] | Location[] | DefinitionLink[] | undefined | null> {
  return Promise.resolve(onImplementationRequest(params));
}

export function onImplementationRequest(
  params: ImplementationParams
): Definition | DefinitionLink[] | Location[] | DefinitionLink[] | undefined | null {
  //TODO
  return onDefinition(params);
}
