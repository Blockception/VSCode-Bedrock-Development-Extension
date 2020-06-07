import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of connect
export const connectTree = createconnect();

function createconnect() : CommandStructureTree {
	var Tree = new CommandStructureTree("connect");
	Tree.Description = "Attempts to connect to the websocket server on the provided URL.";
	Tree.CanEnd = true;

	var item_serverUri = Tree.Add("server uri", CommandStructureType.Any);
	item_serverUri.Description = "The uri to a server";
	item_serverUri.IsOptional = false;
	
	return Tree;
}
