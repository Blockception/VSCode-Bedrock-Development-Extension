import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of title
export const titleTree = createtitle();

function createtitle() : CommandStructureTree {
	var Tree = new CommandStructureTree("title");
	Tree.Description = "Controls screen titles";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player:", CommandStructureType.Any);
	item_player.Description = "player:";
	item_player.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Any);
	item_target.Description = "target";
	item_target.IsOptional = false;

	//Branch: item_target.clear
	{
	var item_clear = Tree.Add("clear", CommandStructureType.Any);
	item_clear.Description = "clear";
	item_clear.IsOptional = false;

	}

	//Branch: item_target.reset
	{
	var item_reset = Tree.Add("reset", CommandStructureType.Any);
	item_reset.Description = "reset";
	item_reset.IsOptional = false;

	}

	//Branch: item_target.<title|subtitle|actionbar>
	{
	var item_title|subtitle|actionbar = Tree.Add("title|subtitle|actionbar", CommandStructureType.Any);
	item_title|subtitle|actionbar.Description = "title|subtitle|actionbar";
	item_title|subtitle|actionbar.IsOptional = false;

	var item_titleText = Tree.Add("titleText:", CommandStructureType.Any);
	item_titleText.Description = "titleText:";
	item_titleText.IsOptional = false;

	var item_message = Tree.Add("message", CommandStructureType.Any);
	item_message.Description = "message";
	item_message.IsOptional = false;

	}

	//Branch: item_target.times
	{
	var item_times = Tree.Add("times", CommandStructureType.Any);
	item_times.Description = "times";
	item_times.IsOptional = false;

	var item_fadeIn = Tree.Add("fadeIn:", CommandStructureType.Any);
	item_fadeIn.Description = "fadeIn:";
	item_fadeIn.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	var item_stay = Tree.Add("stay:", CommandStructureType.Any);
	item_stay.Description = "stay:";
	item_stay.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	var item_fadeOut = Tree.Add("fadeOut:", CommandStructureType.Any);
	item_fadeOut.Description = "fadeOut:";
	item_fadeOut.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	}

	return Tree;
}
