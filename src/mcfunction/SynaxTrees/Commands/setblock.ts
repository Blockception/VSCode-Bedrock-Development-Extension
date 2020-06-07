import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of setblock
export const setblockTree = createsetblock();

function createsetblock() : CommandStructureTree {
	var Tree = new CommandStructureTree("setblock");
	Tree.Description = "Changes a block to another block.";
	Tree.CanEnd = true;

	var item_positionxyz = Tree.Add("position: x y z", CommandStructureType.Any);
	item_positionxyz.Description = "position: x y z";
	item_positionxyz.IsOptional = false;

	var item_tileNameBlock = item_positionxyz.Add("tileName: Block", CommandStructureType.Any);
	item_tileNameBlock.Description = "tileName: Block";
	item_tileNameBlock.IsOptional = false;

	var item_tileDataint = item_tileNameBlock.Add("tileData", CommandStructureType.Integer);
	item_tileDataint.Description = "tileData: int";
	item_tileDataint.IsOptional = true;

	var item_replace|destroy|keep = item_tileDataint.Add("replace|destroy|keep", CommandStructureType.Any);
	item_replace|destroy|keep.Description = "replace|destroy|keep";
	item_replace|destroy|keep.IsOptional = true;

	return Tree;
}
