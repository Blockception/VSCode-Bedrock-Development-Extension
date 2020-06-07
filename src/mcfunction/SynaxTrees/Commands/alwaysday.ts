import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of alwaysday
export const alwaysdayTree = createalwaysday();

function createalwaysday() : CommandStructureTree {
	var Tree = new CommandStructureTree("alwaysday");
	Tree.Description = "Locks and unlocks the day-night cycle.";
	Tree.CanEnd = true;

	var item_lockBoolean = Tree.Add("lock: Boolean", CommandStructureType.);
	item_lockBoolean.Description = "lock: Boolean";
	item_lockBoolean.IsOptional = true;

	return Tree;
}
