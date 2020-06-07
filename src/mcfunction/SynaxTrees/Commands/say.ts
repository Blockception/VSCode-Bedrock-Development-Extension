import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of say
export const sayTree = createsay();

function createsay() : CommandStructureTree {
	var Tree = new CommandStructureTree("say");
	Tree.Description = "Sends a message in the chat to other players.";
	Tree.CanEnd = true;

	var item_message = Tree.Add("message:", CommandStructureType.Any);
	item_message.Description = "message:";
	item_message.IsOptional = false;

	var item_message = Tree.Add("message", CommandStructureType.Any);
	item_message.Description = "message";
	item_message.IsOptional = false;

	return Tree;
}
