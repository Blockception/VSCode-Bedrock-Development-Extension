import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of difficulty
export const difficultyTree = createdifficulty();

function createdifficulty() : CommandStructureTree {
	var Tree = new CommandStructureTree("difficulty");
	Tree.Description = "Sets the difficulty level.";
	Tree.CanEnd = true;

	var item_peaceful = Tree.Add("peaceful", CommandStructureType.SameAsName);
	var item_p = Tree.Add("p", CommandStructureType.SameAsName);
	var item_0 = Tree.Add("0", CommandStructureType.SameAsName);

	var item_easy = Tree.Add("easy", CommandStructureType.SameAsName);
	var item_e = Tree.Add("e", CommandStructureType.SameAsName);
	var item_1 = Tree.Add("1", CommandStructureType.SameAsName);

	var item_normal = Tree.Add("normal", CommandStructureType.SameAsName);
	var item_n = Tree.Add("n", CommandStructureType.SameAsName);
	var item_2 = Tree.Add("2", CommandStructureType.SameAsName);

	var item_hard = Tree.Add("hard", CommandStructureType.SameAsName);
	var item_h = Tree.Add("h", CommandStructureType.SameAsName);
	var item_3 = Tree.Add("3", CommandStructureType.SameAsName);	
	
	item_peaceful.Description = "sets the difficulty to peacefull";
	item_p.Description = item_peaceful.Description;
	item_0.Description = item_peaceful.Description;

	item_easy.Description = "sets the difficulty to easy";
	item_e.Description = item_easy.Description;
	item_1.Description = item_easy.Description;

	item_normal.Description = "sets the difficulty to normal";
	item_n.Description = item_normal.Description;
	item_2.Description = item_normal.Description;

	item_hard.Description = "sets the difficulty to hard";
	item_h.Description = item_hard.Description;
	item_3.Description = item_hard.Description;

	return Tree;
}
