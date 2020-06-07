import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of w
export const wTree = createw();

function createw() : CommandStructureTree {
	var Tree = new CommandStructureTree("w");
	Tree.Description = "Sends a private message to one or more players.";
	Tree.CanEnd = true;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target: target";
	item_target.IsOptional = false;

	var item_messagemessage = item_target.Add("message: message", CommandStructureType.Any);
	item_messagemessage.Description = "message: message";
	item_messagemessage.IsOptional = false;

	return Tree;
}
