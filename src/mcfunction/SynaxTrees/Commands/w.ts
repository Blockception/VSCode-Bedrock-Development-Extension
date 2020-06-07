import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of w
export const wTree = createw();

function createw() : CommandStructureTree {
	var Tree = new CommandStructureTree("w");
	Tree.Description = "Sends a private message to one or more players.";
	Tree.CanEnd = true;

	var item_target = Tree.Add("target:", CommandStructureType.Any);
	item_target.Description = "target:";
	item_target.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target";
	item_target.IsOptional = false;

	var item_message = Tree.Add("message:", CommandStructureType.Any);
	item_message.Description = "message:";
	item_message.IsOptional = false;

	var item_message = Tree.Add("message", CommandStructureType.Any);
	item_message.Description = "message";
	item_message.IsOptional = false;

	return Tree;
}
