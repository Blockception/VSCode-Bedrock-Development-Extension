import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of testfor
export const testforTree = createtestfor();

function createtestfor() : CommandStructureTree {
	var Tree = new CommandStructureTree("testfor");
	Tree.Description = "Counts entities maching specified conditions.";
	Tree.CanEnd = true;

	var item_victim = Tree.Add("victim:", CommandStructureType.Any);
	item_victim.Description = "victim:";
	item_victim.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target";
	item_target.IsOptional = false;

	return Tree;
}
