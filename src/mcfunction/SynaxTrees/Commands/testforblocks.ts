import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of testforblocks
export const testforblocksTree = createtestforblocks();

function createtestforblocks() : CommandStructureTree {
	var Tree = new CommandStructureTree("testforblocks");
	Tree.Description = "Tests whether the blocks in two regions match.";
	Tree.CanEnd = true;

	var item_beginxyz = Tree.Add("begin: x y z", CommandStructureType.Any);
	item_beginxyz.Description = "begin: x y z";
	item_beginxyz.IsOptional = false;

	var item_endxyz = item_beginxyz.Add("end: x y z", CommandStructureType.Any);
	item_endxyz.Description = "end: x y z";
	item_endxyz.IsOptional = false;

	var item_destinationxyz = item_endxyz.Add("destination: x y z", CommandStructureType.Any);
	item_destinationxyz.Description = "destination: x y z";
	item_destinationxyz.IsOptional = false;

	var item_masked|all = item_destinationxyz.Add("masked|all", CommandStructureType.Any);
	item_masked|all.Description = "masked|all";
	item_masked|all.IsOptional = true;

	return Tree;
}
