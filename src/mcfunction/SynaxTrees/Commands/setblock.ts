import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of setblock
export const setblockTree = createsetblock();

function createsetblock() : CommandStructureTree {
	var Tree = new CommandStructureTree("setblock");
	Tree.Description = "Changes a block to another block.";
	Tree.CanEnd = true;

	var item_position = Tree.Add("position:", CommandStructureType.Any);
	item_position.Description = "position:";
	item_position.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_tileName = Tree.Add("tileName:", CommandStructureType.Any);
	item_tileName.Description = "tileName:";
	item_tileName.IsOptional = false;

	var item_Block = Tree.Add("Block", CommandStructureType.Any);
	item_Block.Description = "Block";
	item_Block.IsOptional = false;

	var item_tileDataint = Tree.Add("tileData", CommandStructureType.Integer);
	item_tileDataint.Description = "tileData: int";
	item_tileDataint.IsOptional = true;

	var item_replace|destroy|keep = Tree.Add("replace|destroy|keep", CommandStructureType.Any);
	item_replace|destroy|keep.Description = "replace|destroy|keep";
	item_replace|destroy|keep.IsOptional = true;

	return Tree;
}
