import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of toggledownfall
export const toggledownfallTree = createtoggledownfall();

function createtoggledownfall() : CommandStructureTree {
	var Tree = new CommandStructureTree("toggledownfall");
	Tree.Description = "Toggles the weather.";
	Tree.CanEnd = true;

	return Tree;
}
