import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of testforblocks
export const testforblocksTree = createtestforblocks();

function createtestforblocks() : CommandStructureTree {
	var Tree = new CommandStructureTree("testforblocks");
	Tree.Description = "Tests whether the blocks in two regions match.";
	Tree.CanEnd = true;

	var item_begin = Tree.Add("begin:", CommandStructureType.Any);
	item_begin.Description = "begin:";
	item_begin.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_end = Tree.Add("end:", CommandStructureType.Any);
	item_end.Description = "end:";
	item_end.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_destination = Tree.Add("destination:", CommandStructureType.Any);
	item_destination.Description = "destination:";
	item_destination.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_masked|all = Tree.Add("masked|all", CommandStructureType.Any);
	item_masked|all.Description = "masked|all";
	item_masked|all.IsOptional = true;

	return Tree;
}
