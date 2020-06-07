import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of daylock
export const daylockTree = createdaylock();

function createdaylock() : CommandStructureTree {
	var Tree = new CommandStructureTree("daylock");
	Tree.Description = "Locks and unlocks the day-night cycle.";
	Tree.CanEnd = true;

	var item_lock = Tree.Add("lock", CommandStructureType.Boolean);
	item_lock.Description = "True or false to wheter or not the day must be locked";
	item_lock.IsOptional = true;

	return Tree;
}
