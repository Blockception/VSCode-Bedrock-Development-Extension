import { Location } from "vscode-languageserver";
import { Identifiable, Locatable } from "../Types/Minecraft/Interfaces/include";
import { DataCollectorIO } from "./Interface/DataCollectorIO";
import { ReferenceFinder } from "./Interface/ReferenceFinder";

export class DataCollector<T extends Identifiable & Locatable> implements DataCollectorIO<T>, ReferenceFinder {
  /**
   * Stores identifier, value
   */
  private data: Map<string, T>;

  constructor() {
    this.data = new Map<string, T>();
  }

  /**
   * Retrieves stored data that has been stored under the given file
   * @param uri
   */
  public GetFromFile(uri: string): T[] | undefined {
    let Out: T[] = [];

    this.data.forEach((value, ID) => {
      if (value.Location.uri === uri) Out.push(value);
    });

    return Out;
  }

  /**
   * Removes any data from the associated file
   * @param uri The filepath uri used
   */
  public DeleteFile(uri: string): void {
    let Keys: string[] = [];

    this.data.forEach((value, ID) => {
      if (value.Location.uri === uri) Keys.push(ID);
    });

    Keys.forEach((k) => this.data.delete(k));
  }

  /**
   *
   * @param ID
   */
  public DeleteID(ID: string): void {
    this.data.delete(ID);
  }

  /**
   * Delete all files with given folder
   * @param uri The folder uri to delete
   */
  public DeleteFolder(uri: string): void {
    let Keys: string[] = [];

    this.data.forEach((value, ID) => {
      if (value.Location.uri.startsWith(uri)) Keys.push(ID);
    });

    Keys.forEach((k) => this.data.delete(k));
  }

  /**
   * Clear all data;
   */
  public Clear(): void {
    this.data.clear();
  }

  /**
   *
   * @param Identifier
   */
  public GetFromID(Identifier: string): T | undefined {
    let Item = this.data.get(Identifier);

    return Item;
  }

  /**
   *
   * @param Identifier
   */
  public HasID(Identifier: string): boolean {
    return this.data.has(Identifier);
  }

  /**
   *
   * @param value
   */
  public Set(value: T): void {
    this.data.set(value.Identifier, value);
  }

  /**
   * Loops over all the data in the storage
   * @param callback
   */
  public ForEach(callback: (value: T) => void): void {
    this.data.forEach((v, k) => callback(v));
  }

  /**
   * Activates the given function on each object that matches the given
   * @param Identifier
   * @param callback
   */
  public ForEachID(Identifier: string, callback: (value: T) => void): void {
    let Item = this.GetFromID(Identifier);

    if (Item) {
      callback(Item);
    }
  }

  /**
   * Retrieves all the data
   */
  public GetAll(): T[] {
    let Out: T[] = [];

    this.data.forEach((v, k) => Out.push(v));

    return Out;
  }

  /**
   *
   */
  public Update(value: T | undefined, uri: string | undefined = undefined) {
    if (uri) this.DeleteFile(uri);

    if (value) {
      this.Set(value);
    }
  }

  /**
   *
   * @param query
   * @param receiver
   */
  public FindReference(query: string, receiver: Location[]): void {
    for (let [key, value] of this.data) {
      if (value && value.Identifier.includes(query)) {
        receiver.push(value.Location);
      }
    }
  }

  /**
   *
   * @param uri
   * @param call
   */
  public ForEachFile(uri: string, call: (item: T) => void): void {
    for (let [key, value] of this.data) {
      if (value && value.Location.uri === uri) {
        call(value);
      }
    }
  }
}
