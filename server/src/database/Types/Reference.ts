import { Location } from 'vscode-languageserver';
import { Identifiable, Locatable } from '../../minecraft/Interfaces/include';
import { EmptyTypes } from '../../minecraft/types/Empty';

export class DataReference implements Locatable, Identifiable {
	public Location: Location;
	public Identifier: string;

	constructor() {
		this.Location = EmptyTypes.EmptyLocation();
		this.Identifier = '';
	}
}