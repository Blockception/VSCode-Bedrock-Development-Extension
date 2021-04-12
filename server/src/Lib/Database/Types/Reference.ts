import { Location } from "vscode-languageserver";
import { Locatable, Identifiable } from "../../Types/Minecraft/Interfaces/include";

export class DataReference implements Locatable, Identifiable {
  public Location: Location;
  public Identifier: string;

  constructor(Identifier: string, location: Location) {
    this.Location = location;
    this.Identifier = Identifier;
  }
}
