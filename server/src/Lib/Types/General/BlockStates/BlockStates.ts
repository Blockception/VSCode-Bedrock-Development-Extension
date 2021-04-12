export type BlockStateValue = string | boolean | number;

export class BlockState {
  public Name: string;
  public Value: BlockStateValue;

  constructor(Name: string = "", Value: BlockStateValue = 0) {
    this.Name = Name;
    this.Value = Value;
  }
}
