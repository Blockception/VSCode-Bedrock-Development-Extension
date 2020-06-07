import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of me
export const meTree = createme();

function createme() : CommandStructureTree {
	var Tree = new CommandStructureTree("me");
	Tree.Description = "Displays a message about yourself";
	Tree.CanEnd = true;

	var item_message = Tree.Add("message:", CommandStructureType.Any);
	item_message.Description = "message:";
	item_message.IsOptional = false;

	var item_message = Tree.Add("message", CommandStructureType.Any);
	item_message.Description = "message";
	item_message.IsOptional = false;

	return Tree;
}
