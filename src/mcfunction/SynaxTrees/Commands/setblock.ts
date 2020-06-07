import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of setblock
export const setblockTree = createsetblock();

function createsetblock() : CommandStructureTree {
	var Tree = new CommandStructureTree("setblock");
	Tree.Description = "Changes a block to another block.";

	var item_x = Tree.Add("position: x", CommandStructureType.Coordinate);
	item_x.Description = "The x coordinate to place the block at";
	item_x.IsOptional = false;

	var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
	item_y.Description = "The y coordinate to place the block at";
	item_y.IsOptional = false;

	var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
	item_z.Description = "The z coordinate to place the block at";
	item_z.IsOptional = false;

	var item_tileNameBlock = item_z.Add("tileName: Block", CommandStructureType.Block);
	item_tileNameBlock.Description = "tileName: Block";
	item_tileNameBlock.IsOptional = false;

	var item_tileDataint = item_tileNameBlock.Add("tileData", CommandStructureType.Integer);
	item_tileDataint.Description = "tileData: int";
	item_tileDataint.IsOptional = true;

	//Modes
	var item_destroy = item_tileDataint.Add("destroy", CommandStructureType.SameAsName);
	item_destroy.Description = "destroy";
	item_destroy.IsOptional = true;

	var item_keep = item_tileDataint.Add("keep", CommandStructureType.SameAsName);
	item_keep.Description = "keep";
	item_keep.IsOptional = true;

	var item_replace = item_tileDataint.Add("replace", CommandStructureType.SameAsName);
	item_replace.Description = "replace";
	item_replace.IsOptional = true;

	return Tree;
}
