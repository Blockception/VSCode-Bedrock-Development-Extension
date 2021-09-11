import { DataCollectorIO } from "../Interface/DataCollectorIO";
import { ReferenceFinder } from "../Interface/ReferenceFinder";

export class CollectorBase<T> implements DataCollectorIO<T>, ReferenceFinder {
  FindReference(query: string, receiver: any[]): void {
    for (let [key, property] of Object.entries(this)) {
      if (ReferenceFinder.is(property)) {
        property.FindReference(query, receiver);
      }
    }
  }

  /**
   * Clears any data in this collection
   */
  public Clear(): void {
    for (let [key, property] of Object.entries(this)) {
      if (DataCollectorIO.is<T>(property)) {
        property.Clear();
      }
    }
  }

  /**
   * Clears any data in this collection that comes from a given file
   */
  public.deleteFile(uri: string): void {
    for (let [key, property] of Object.entries(this)) {
      if (DataCollectorIO.is<T>(property)) {
        property.deleteFile(uri);
      }
    }
  }

  /**
   * Clears any data in this collection that comes from a given folder
   */
  public DeleteFolder(uri: string): void {
    for (let [key, property] of Object.entries(this)) {
      if (DataCollectorIO.is<T>(property)) {
        property.deleteFile(uri);
      }
    }
  }

  ForEachFile(uri: string, call: (item: T) => void): void {
    for (let [key, property] of Object.entries(this)) {
      if (DataCollectorIO.is<T>(property)) {
        property.ForEachFile(uri, call);
      }
    }
  }
}
