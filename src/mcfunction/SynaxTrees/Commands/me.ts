import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of me
export const meTree = createme();

function createme() : CommandStructureTree {
	var Tree = new CommandStructureTree("me");
	Tree.Description = "Displays a message about yourself";
	Tree.CanEnd = true;

	var item_messagemessage = Tree.Add("message", CommandStructureType.Any);
	item_messagemessage.Description = "displays a message about yourself";
	item_messagemessage.IsOptional = false;

	return Tree;
}
