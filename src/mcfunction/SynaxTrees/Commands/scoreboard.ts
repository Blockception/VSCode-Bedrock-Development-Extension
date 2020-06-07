import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of scoreboard
export const scoreboardTree = createscoreboard();

function createscoreboard() : CommandStructureTree {
	var Tree = new CommandStructureTree("scoreboard");
	Tree.Description = "Lists all created variables in the scoreboard";
	Tree.CanEnd = true;

	//Branch: scoreboard.objectives
	{
	var item_objectives = Tree.Add("objectives", CommandStructureType.Any);
	item_objectives.Description = "objectives";
	item_objectives.IsOptional = false;

	//Branch: item_objectives.list
	{
	var item_list = Tree.Add("list", CommandStructureType.Any);
	item_list.Description = "list";
	item_list.IsOptional = false;

	}

	//Branch: item_objectives.add
	{
	var item_add = Tree.Add("add", CommandStructureType.Any);
	item_add.Description = "add";
	item_add.IsOptional = false;

	var item_name = Tree.Add("name", CommandStructureType.Any);
	item_name.Description = "name";
	item_name.IsOptional = false;

	var item_dummy = Tree.Add("dummy", CommandStructureType.Any);
	item_dummy.Description = "dummy";
	item_dummy.IsOptional = false;

	var item_displaynamestring = Tree.Add("display name: string", CommandStructureType.Any);
	item_displaynamestring.Description = "display name: string";
	item_displaynamestring.IsOptional = true;

	}

	//Branch: item_objectives.remove
	{
	var item_remove = Tree.Add("remove", CommandStructureType.Any);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;

	var item_name = Tree.Add("name", CommandStructureType.Any);
	item_name.Description = "name";
	item_name.IsOptional = false;

	}

	//Branch: item_objectives.setdisplay
	{
	var item_setdisplay = Tree.Add("setdisplay", CommandStructureType.Any);
	item_setdisplay.Description = "setdisplay";
	item_setdisplay.IsOptional = false;

	//Branch: item_setdisplay.<slot>
	{
	var item_slot = Tree.Add("slot", CommandStructureType.Any);
	item_slot.Description = "slot";
	item_slot.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_setdisplay.belowname
	{
	var item_belowname = Tree.Add("belowname", CommandStructureType.Any);
	item_belowname.Description = "belowname";
	item_belowname.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_setdisplay.list
	{
	var item_list = Tree.Add("list", CommandStructureType.Any);
	item_list.Description = "list";
	item_list.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_setdisplay.sidebar
	{
	var item_sidebar = Tree.Add("sidebar", CommandStructureType.Any);
	item_sidebar.Description = "sidebar";
	item_sidebar.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	}

	}

	//Branch: scoreboard.players
	{
	var item_players = Tree.Add("players", CommandStructureType.Any);
	item_players.Description = "players";
	item_players.IsOptional = false;

	//Branch: item_players.list
	{
	var item_list = Tree.Add("list", CommandStructureType.Any);
	item_list.Description = "list";
	item_list.IsOptional = false;

	var item_entity = Tree.Add("entity", CommandStructureType.Any);
	item_entity.Description = "entity";
	item_entity.IsOptional = true;

	}

	//Branch: item_players.set
	{
	var item_set = Tree.Add("set", CommandStructureType.Any);
	item_set.Description = "set";
	item_set.IsOptional = false;

	var item_entity = Tree.Add("entity:", CommandStructureType.Any);
	item_entity.Description = "entity:";
	item_entity.IsOptional = false;

	var item_string = Tree.Add("string", CommandStructureType.Any);
	item_string.Description = "string";
	item_string.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_score = Tree.Add("score", CommandStructureType.Any);
	item_score.Description = "score";
	item_score.IsOptional = false;

	}

	//Branch: item_players.add
	{
	var item_add = Tree.Add("add", CommandStructureType.Any);
	item_add.Description = "add";
	item_add.IsOptional = false;

	var item_entity = Tree.Add("entity:", CommandStructureType.Any);
	item_entity.Description = "entity:";
	item_entity.IsOptional = false;

	var item_string = Tree.Add("string", CommandStructureType.Any);
	item_string.Description = "string";
	item_string.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_count = Tree.Add("count", CommandStructureType.Any);
	item_count.Description = "count";
	item_count.IsOptional = false;

	}

	//Branch: item_players.remove
	{
	var item_remove = Tree.Add("remove", CommandStructureType.Any);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;

	var item_entity = Tree.Add("entity:", CommandStructureType.Any);
	item_entity.Description = "entity:";
	item_entity.IsOptional = false;

	var item_string = Tree.Add("string", CommandStructureType.Any);
	item_string.Description = "string";
	item_string.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_count = Tree.Add("count", CommandStructureType.Any);
	item_count.Description = "count";
	item_count.IsOptional = false;

	}

	//Branch: item_players.reset
	{
	var item_reset = Tree.Add("reset", CommandStructureType.Any);
	item_reset.Description = "reset";
	item_reset.IsOptional = false;

	var item_entity = Tree.Add("entity:", CommandStructureType.Any);
	item_entity.Description = "entity:";
	item_entity.IsOptional = false;

	var item_string = Tree.Add("string", CommandStructureType.Any);
	item_string.Description = "string";
	item_string.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_players.operation
	{
	var item_operation = Tree.Add("operation", CommandStructureType.Any);
	item_operation.Description = "operation";
	item_operation.IsOptional = false;

	var item_targetName = Tree.Add("targetName", CommandStructureType.Any);
	item_targetName.Description = "targetName";
	item_targetName.IsOptional = false;

	var item_targetObjective = Tree.Add("targetObjective", CommandStructureType.Any);
	item_targetObjective.Description = "targetObjective";
	item_targetObjective.IsOptional = false;

	//Branch: item_targetObjective.<operation>
	{
	var item_operation = Tree.Add("operation", CommandStructureType.Any);
	item_operation.Description = "operation";
	item_operation.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.%=
	{
	var item_%= = Tree.Add("%=", CommandStructureType.Any);
	item_%=.Description = "%=";
	item_%=.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.*=
	{
	var item_*= = Tree.Add("*=", CommandStructureType.Any);
	item_*=.Description = "*=";
	item_*=.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.+=
	{
	var item_+= = Tree.Add("+=", CommandStructureType.Any);
	item_+=.Description = "+=";
	item_+=.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.-=
	{
	var item_-= = Tree.Add("-=", CommandStructureType.Any);
	item_-=.Description = "-=";
	item_-=.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective./=
	{
	var item_/= = Tree.Add("/=", CommandStructureType.Any);
	item_/=.Description = "/=";
	item_/=.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.<
	{
	var item_ = Tree.Add("", CommandStructureType.Any);
	item_.Description = "";
	item_.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.=
	{
	var item_= = Tree.Add("=", CommandStructureType.Any);
	item_=.Description = "=";
	item_=.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.>
	{
	var item_ = Tree.Add("", CommandStructureType.Any);
	item_.Description = "";
	item_.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.swap
	{
	var item_swap = Tree.Add("swap", CommandStructureType.Any);
	item_swap.Description = "swap";
	item_swap.IsOptional = false;

	var item_selector = Tree.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	}

	//Branch: item_players.test
	{
	var item_test = Tree.Add("test", CommandStructureType.Any);
	item_test.Description = "test";
	item_test.IsOptional = false;

	var item_entity = Tree.Add("entity", CommandStructureType.Any);
	item_entity.Description = "entity";
	item_entity.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_min|* = Tree.Add("min|*", CommandStructureType.Any);
	item_min|*.Description = "min|*";
	item_min|*.IsOptional = false;

	var item_max|* = Tree.Add("max|*", CommandStructureType.Any);
	item_max|*.Description = "max|*";
	item_max|*.IsOptional = false;

	}

	//Branch: item_players.random
	{
	var item_random = Tree.Add("random", CommandStructureType.Any);
	item_random.Description = "random";
	item_random.IsOptional = false;

	var item_entity = Tree.Add("entity", CommandStructureType.Any);
	item_entity.Description = "entity";
	item_entity.IsOptional = false;

	var item_objective = Tree.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_min = Tree.Add("min", CommandStructureType.Any);
	item_min.Description = "min";
	item_min.IsOptional = false;

	var item_max = Tree.Add("max", CommandStructureType.Any);
	item_max.Description = "max";
	item_max.IsOptional = false;

	}

	}

	return Tree;
}
