import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of alwaysday
export const alwaysdayTree = createalwaysday();

function createalwaysday() : CommandStructureTree {
	var Tree = new CommandStructureTree("alwaysday");
	Tree.Description = "Locks and unlocks the day-night cycle.";
	Tree.CanEnd = true;

	var item_lock = Tree.Add("lock", CommandStructureType.Boolean);
	item_lock.Description = "True or false to wheter or not the day must be locked";
	item_lock.IsOptional = true;

	return Tree;
}
