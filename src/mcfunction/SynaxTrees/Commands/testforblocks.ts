import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of testforblocks
export const testforblocksTree = createtestforblocks();

function createtestforblocks() : CommandStructureTree {
	var Tree = new CommandStructureTree("testforblocks");
	Tree.Description = "Tests whether the blocks in two regions match.";
	Tree.CanEnd = true;

	var item_beginx = Tree.Add("start: x", CommandStructureType.Coordinate);
	item_beginx.Description = "The x coordinate to start to look at";
	item_beginx.IsOptional = false;

	var item_beginy = item_beginx.Add("start: y", CommandStructureType.Coordinate);
	item_beginy.Description = "The y coordinate to start to look at";
	item_beginy.IsOptional = false;

	var item_beginz = item_beginy.Add("start: z", CommandStructureType.Coordinate);
	item_beginz.Description = "The z coordinate to start to look at";
	item_beginz.IsOptional = false;

	var item_endx = Tree.Add("end: x", CommandStructureType.Coordinate);
	item_endx.Description = "The x coordinate to end to look at";
	item_endx.IsOptional = false;

	var item_endy = item_endx.Add("end: y", CommandStructureType.Coordinate);
	item_endy.Description = "The y coordinate to end to look at";
	item_endy.IsOptional = false;

	var item_endz = item_endy.Add("end: z", CommandStructureType.Coordinate);
	item_endz.Description = "The z coordinate to end to look at";
	item_endz.IsOptional = false;

	var item_masked = item_endz.Add("masked", CommandStructureType.Any);
	item_masked.Description = "masked";
	item_masked.IsOptional = true;

	var item_all = item_endz.Add("ll", CommandStructureType.Any);
	item_all.Description = "all";
	item_all.IsOptional = true;

	return Tree;
}
