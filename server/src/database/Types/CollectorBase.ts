import { DataCollectorIO } from '../Interface/DataCollectorIO';
import { ReferenceFinder } from '../Interface/ReferenceFinder';

export class CollectorBase implements DataCollectorIO, ReferenceFinder {
	FindReference(query: string, receiver: any[]): void {
		for (let property in this) {
			if (ReferenceFinder.is(property)) {
				property.FindReference(query, receiver);
			}
		}
	}

	/**
	 * Clears any data in this collection
	 */
	public Clear(): void {
		for (let property in this) {
			if (DataCollectorIO.is(property)) {
				property.Clear();
			}
		}
	}

	/**
	 * Clears any data in this collection that comes from a given file
	 */
	public DeleteFile(uri: string): void {
		for (let property in this) {
			if (DataCollectorIO.is(property)) {
				property.DeleteFile(uri);
			}
		}
	}

	/**
	 * Clears any data in this collection that comes from a given folder
	 */
	public DeleteFolder(uri: string): void {
		for (let property in this) {
			if (DataCollectorIO.is(property)) {
				property.DeleteFile(uri);
			}
		}
	}
}