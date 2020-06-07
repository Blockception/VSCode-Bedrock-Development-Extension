import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of msg
export const msgTree = createmsg();

function createmsg() : CommandStructureTree {
	var Tree = new CommandStructureTree("msg");
	Tree.Description = "Sends a private message to one or more players.";
	Tree.CanEnd = true;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "The target/player to target";
	item_target.IsOptional = false;

	var item_message = item_target.Add("message", CommandStructureType.Any);
	item_message.Description = "The message to send";
	item_message.IsOptional = false;

	return Tree;
}
