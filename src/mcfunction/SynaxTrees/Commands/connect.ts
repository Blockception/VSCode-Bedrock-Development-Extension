import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of connect
export const connectTree = createconnect();

function createconnect() : CommandStructureTree {
	var Tree = new CommandStructureTree("connect");
	Tree.Description = "Attempts to connect to the websocket server on the provided URL.";
	Tree.CanEnd = true;

	var item_serverUri = Tree.Add("serverUri:", CommandStructureType.Any);
	item_serverUri.Description = "serverUri:";
	item_serverUri.IsOptional = false;

	var item_text = Tree.Add("text", CommandStructureType.Any);
	item_text.Description = "text";
	item_text.IsOptional = false;

	return Tree;
}
