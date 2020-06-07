import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of gamemode
export const gamemodeTree = creategamemode();

function creategamemode() : CommandStructureTree {
	var Tree = new CommandStructureTree("gamemode");
	Tree.Description = "Sets a player's game mode.";
	Tree.CanEnd = true;

	var item_playertarget = new CommandStructureItem("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = true;

	var item_0 = Tree.Add("0", CommandStructureType.SameAsName);
	item_0.Description = "Sets the gamemode of the player to: survival";
	item_0.IsOptional = false;
	item_0.Childs.push(item_playertarget);

	var item_1 = Tree.Add("1", CommandStructureType.SameAsName);
	item_1.Description = "Sets the gamemode of the player to: creative";
	item_1.IsOptional = false;
	item_1.Childs.push(item_playertarget);

	var item_2 = Tree.Add("2", CommandStructureType.SameAsName);
	item_2.Description = "Sets the gamemode of the player to: adventure";
	item_2.IsOptional = false;
	item_2.Childs.push(item_playertarget);

	var item_s = Tree.Add("s", CommandStructureType.SameAsName);
	item_s.Description = "Sets the gamemode of the player to: survival";
	item_s.IsOptional = false;
	item_s.Childs.push(item_playertarget);

	var item_d = Tree.Add("d", CommandStructureType.SameAsName);
	item_d.Description = "Sets the gamemode of the player to: default";
	item_d.IsOptional = false;
	item_d.Childs.push(item_playertarget);

	var item_c = Tree.Add("c", CommandStructureType.SameAsName);
	item_c.Description = "Sets the gamemode of the player to: creative";
	item_c.IsOptional = false;
	item_c.Childs.push(item_playertarget);

	var item_a = Tree.Add("a", CommandStructureType.SameAsName);
	item_a.Description = "Sets the gamemode of the player to: adventure";
	item_a.IsOptional = false;
	item_a.Childs.push(item_playertarget);

	var item_adventure = Tree.Add("adventure", CommandStructureType.SameAsName);
	item_adventure.Description = "Sets the gamemode of the player to: adventure";
	item_adventure.IsOptional = false;
	item_adventure.Childs.push(item_playertarget);

	var item_creative = Tree.Add("creative", CommandStructureType.SameAsName);
	item_creative.Description = "Sets the gamemode of the player to: creative";
	item_creative.IsOptional = false;
	item_creative.Childs.push(item_playertarget);

	var item_default = Tree.Add("default", CommandStructureType.SameAsName);
	item_default.Description = "Sets the gamemode of the player to: default";
	item_default.IsOptional = false;
	item_default.Childs.push(item_playertarget);

	var item_survival = Tree.Add("survival", CommandStructureType.SameAsName);
	item_survival.Description = "Sets the gamemode of the player to: survival";
	item_survival.IsOptional = false;
	item_survival.Childs.push(item_playertarget);

	return Tree;
}
