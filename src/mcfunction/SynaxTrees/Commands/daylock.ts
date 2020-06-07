import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of daylock
export const daylockTree = createdaylock();

function createdaylock() : CommandStructureTree {
	var Tree = new CommandStructureTree("daylock");
	Tree.Description = "Locks and unlocks the day-night cycle.";
	Tree.CanEnd = true;

	var item_lockBoolean = Tree.Add("lock: Boolean", CommandStructureType.Boolean);
	item_lockBoolean.Description = "lock: Boolean";
	item_lockBoolean.IsOptional = true;

	return Tree;
}
