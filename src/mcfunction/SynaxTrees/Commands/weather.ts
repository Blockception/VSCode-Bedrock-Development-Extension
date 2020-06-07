import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of weather
export const weatherTree = createweather();

function createweather() : CommandStructureTree {
	var Tree = new CommandStructureTree("weather");
	Tree.Description = "Sets the weather";
	Tree.CanEnd = true;

	var item_clear|rain|thunder = Tree.Add("clear|rain|thunder", CommandStructureType.Any);
	item_clear|rain|thunder.Description = "clear|rain|thunder";
	item_clear|rain|thunder.IsOptional = false;

	var item_durationint = item_clear|rain|thunder.Add("duration", CommandStructureType.Integer);
	item_durationint.Description = "duration: int";
	item_durationint.IsOptional = true;

	return Tree;
}
