import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of function
export const functionTree = createfunction();

function createfunction() : CommandStructureTree {
	var Tree = new CommandStructureTree("function");
	Tree.Description = "Runs commands found in the corresponding function file.";
	Tree.CanEnd = true;

	var item_function|filepath = Tree.Add("function|filepath", CommandStructureType.Any);
	item_function|filepath.Description = "function|filepath";
	item_function|filepath.IsOptional = false;

	return Tree;
}
