import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of tell
export const tellTree = createtell();

function createtell() : CommandStructureTree {
	var Tree = new CommandStructureTree("tell");
	Tree.Description = "Sends a private message to one or more players.";
	Tree.CanEnd = true;

	var item_targettarget = Tree.Add("target", CommandStructureType.Target);
	item_targettarget.Description = "target: target";
	item_targettarget.IsOptional = false;

	var item_messagemessage = item_targettarget.Add("message: message", CommandStructureType.Any);
	item_messagemessage.Description = "message: message";
	item_messagemessage.IsOptional = false;

	return Tree;
}
