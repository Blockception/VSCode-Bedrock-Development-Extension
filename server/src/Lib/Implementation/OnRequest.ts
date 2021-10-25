import { Definition, DefinitionLink, ImplementationParams, Location } from 'vscode-languageserver';
import { onDefinition } from '../Definition/OnRequest';

export async function onImplementationRequestAsync(params: ImplementationParams) : Promise<Definition | DefinitionLink[] | Location[] | DefinitionLink[] | undefined | null> {
  return new Promise((resolve, reject)=>{
    resolve(onImplementationReques(params));
  })
}

export function onImplementationReques(params: ImplementationParams) : Definition | DefinitionLink[] | Location[] | DefinitionLink[] | undefined | null {
  //TODO 
  return onDefinition(params);
}