import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of testfor
export const testforTree = createtestfor();

function createtestfor() : CommandStructureTree {
	var Tree = new CommandStructureTree("testfor");
	Tree.Description = "Counts entities maching specified conditions.";
	Tree.CanEnd = true;

	var item_victimtarget = Tree.Add("victim", CommandStructureType.Target);
	item_victimtarget.Description = "victim: target";
	item_victimtarget.IsOptional = false;

	return Tree;
}
