import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of titleraw
export const titlerawTree = createtitleraw();

function createtitleraw() : CommandStructureTree {
	var Tree = new CommandStructureTree("titleraw");
	Tree.Description = "Controls screen titles with JSON messages.";
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

	var item_{"rawtext"[{"text"""},"",{"translate"""}]} = Tree.Add("{ "rawtext": [ { "text": "" }, "", { "translate": "" } ] }", CommandStructureType.Any);
	item_{"rawtext"[{"text"""},"",{"translate"""}]}.Description = "{ "rawtext": [ { "text": "" }, "", { "translate": "" } ] }";
	item_{"rawtext"[{"text"""},"",{"translate"""}]}.IsOptional = false;

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
