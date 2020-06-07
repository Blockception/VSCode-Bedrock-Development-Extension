import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of title
export const titleTree = createtitle();

function createtitle() : CommandStructureTree {
	var Tree = new CommandStructureTree("title");
	Tree.Description = "Controls screen titles";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = false;

	//Branch: item_playertarget.clear
	{
	var item_clear = item_playertarget.Add("clear", CommandStructureType.Any);
	item_clear.Description = "clear";
	item_clear.IsOptional = false;

	}

	//Branch: item_playertarget.reset
	{
	var item_reset = item_playertarget.Add("reset", CommandStructureType.Any);
	item_reset.Description = "reset";
	item_reset.IsOptional = false;

	}

	//Branch: item_playertarget.<title|subtitle|actionbar>
	{
	var item_title|subtitle|actionbar = item_playertarget.Add("title|subtitle|actionbar", CommandStructureType.Any);
	item_title|subtitle|actionbar.Description = "title|subtitle|actionbar";
	item_title|subtitle|actionbar.IsOptional = false;

	var item_titleTextmessage = item_title|subtitle|actionbar.Add("titleText: message", CommandStructureType.Any);
	item_titleTextmessage.Description = "titleText: message";
	item_titleTextmessage.IsOptional = false;

	}

	//Branch: item_playertarget.times
	{
	var item_times = item_playertarget.Add("times", CommandStructureType.Any);
	item_times.Description = "times";
	item_times.IsOptional = false;

	var item_fadeInint = item_times.Add("fadeIn", CommandStructureType.Integer);
	item_fadeInint.Description = "fadeIn: int";
	item_fadeInint.IsOptional = false;

	var item_stayint = item_fadeInint.Add("stay", CommandStructureType.Integer);
	item_stayint.Description = "stay: int";
	item_stayint.IsOptional = false;

	var item_fadeOutint = item_stayint.Add("fadeOut", CommandStructureType.Integer);
	item_fadeOutint.Description = "fadeOut: int";
	item_fadeOutint.IsOptional = false;

	}

	return Tree;
}
