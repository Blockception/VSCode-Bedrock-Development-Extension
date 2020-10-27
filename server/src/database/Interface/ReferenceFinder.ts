export interface ReferenceFinder {
  FindReference(query : string, receiver : Location[]) : void
}

export namespace ReferenceFinder {
	export function is(value : any) : value is ReferenceFinder {
		if (value.FindReference){
			return true;
		}

		return false;
	}
}