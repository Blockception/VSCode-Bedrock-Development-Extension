import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of testforblock
export const testforblockTree = createtestforblock();

function createtestforblock() : CommandStructureTree {
	var Tree = new CommandStructureTree("testforblock");
	Tree.Description = "Tests whether a certain block is in a specific location.";
	Tree.CanEnd = true;

	var item_x = Tree.Add("position: x", CommandStructureType.Coordinate);
	item_x.Description = "The x coordinate to look at";
	item_x.IsOptional = false;

	var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
	item_y.Description = "The y coordinate to look at";
	item_y.IsOptional = false;

	var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
	item_z.Description = "The z coordinate to look at";
	item_z.IsOptional = false;

	var item_tileNameBlock = item_z.Add("tileName: Block", CommandStructureType.Block);
	item_tileNameBlock.Description = "tileName: Block";
	item_tileNameBlock.IsOptional = false;

	var item_dataValueint = item_tileNameBlock.Add("dataValue", CommandStructureType.Integer);
	item_dataValueint.Description = "dataValue: int";
	item_dataValueint.IsOptional = true;

	return Tree;
}
