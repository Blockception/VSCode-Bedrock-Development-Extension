import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of testforblock
export const testforblockTree = createtestforblock();

function createtestforblock() : CommandStructureTree {
	var Tree = new CommandStructureTree("testforblock");
	Tree.Description = "Tests whether a certain block is in a specific location.";
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

	var item_dataValueint = Tree.Add("dataValue", CommandStructureType.Integer);
	item_dataValueint.Description = "dataValue: int";
	item_dataValueint.IsOptional = true;

	return Tree;
}
