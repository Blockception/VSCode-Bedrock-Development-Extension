import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of testforblock
export const testforblockTree = createtestforblock();

function createtestforblock() : CommandStructureTree {
	var Tree = new CommandStructureTree("testforblock");
	Tree.Description = "Tests whether a certain block is in a specific location.";
	Tree.CanEnd = true;

	var item_positionxyz = Tree.Add("position: x y z", CommandStructureType.Any);
	item_positionxyz.Description = "position: x y z";
	item_positionxyz.IsOptional = false;

	var item_tileNameBlock = item_positionxyz.Add("tileName: Block", CommandStructureType.Any);
	item_tileNameBlock.Description = "tileName: Block";
	item_tileNameBlock.IsOptional = false;

	var item_dataValueint = item_tileNameBlock.Add("dataValue", CommandStructureType.Integer);
	item_dataValueint.Description = "dataValue: int";
	item_dataValueint.IsOptional = true;

	return Tree;
}
