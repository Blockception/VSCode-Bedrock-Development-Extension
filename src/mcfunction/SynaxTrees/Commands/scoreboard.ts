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
	var item_list = item_objectives.Add("list", CommandStructureType.Any);
	item_list.Description = "list";
	item_list.IsOptional = false;

	}

	//Branch: item_objectives.add
	{
	var item_add = item_objectives.Add("add", CommandStructureType.Any);
	item_add.Description = "add";
	item_add.IsOptional = false;

	var item_name = item_add.Add("name", CommandStructureType.Any);
	item_name.Description = "name";
	item_name.IsOptional = false;

	var item_dummy = item_name.Add("dummy", CommandStructureType.Any);
	item_dummy.Description = "dummy";
	item_dummy.IsOptional = false;

	var item_displaynamestring = item_dummy.Add("display name: string", CommandStructureType.Any);
	item_displaynamestring.Description = "display name: string";
	item_displaynamestring.IsOptional = true;

	}

	//Branch: item_objectives.remove
	{
	var item_remove = item_objectives.Add("remove", CommandStructureType.Any);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;

	var item_name = item_remove.Add("name", CommandStructureType.Any);
	item_name.Description = "name";
	item_name.IsOptional = false;

	}

	//Branch: item_objectives.setdisplay
	{
	var item_setdisplay = item_objectives.Add("setdisplay", CommandStructureType.Any);
	item_setdisplay.Description = "setdisplay";
	item_setdisplay.IsOptional = false;

	//Branch: item_setdisplay.<slot>
	{
	var item_slot = item_setdisplay.Add("slot", CommandStructureType.Any);
	item_slot.Description = "slot";
	item_slot.IsOptional = false;

	var item_objective = item_slot.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_setdisplay.belowname
	{
	var item_belowname = item_setdisplay.Add("belowname", CommandStructureType.Any);
	item_belowname.Description = "belowname";
	item_belowname.IsOptional = false;

	var item_objective = item_belowname.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_setdisplay.list
	{
	var item_list = item_setdisplay.Add("list", CommandStructureType.Any);
	item_list.Description = "list";
	item_list.IsOptional = false;

	var item_objective = item_list.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_setdisplay.sidebar
	{
	var item_sidebar = item_setdisplay.Add("sidebar", CommandStructureType.Any);
	item_sidebar.Description = "sidebar";
	item_sidebar.IsOptional = false;

	var item_objective = item_sidebar.Add("objective", CommandStructureType.Any);
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
	var item_list = item_players.Add("list", CommandStructureType.Any);
	item_list.Description = "list";
	item_list.IsOptional = false;

	var item_entity = item_list.Add("entity", CommandStructureType.Any);
	item_entity.Description = "entity";
	item_entity.IsOptional = true;

	}

	//Branch: item_players.set
	{
	var item_set = item_players.Add("set", CommandStructureType.Any);
	item_set.Description = "set";
	item_set.IsOptional = false;

	var item_entitystring = item_set.Add("entity: string", CommandStructureType.Any);
	item_entitystring.Description = "entity: string";
	item_entitystring.IsOptional = false;

	var item_objective = item_entitystring.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_score = item_objective.Add("score", CommandStructureType.Any);
	item_score.Description = "score";
	item_score.IsOptional = false;

	}

	//Branch: item_players.add
	{
	var item_add = item_players.Add("add", CommandStructureType.Any);
	item_add.Description = "add";
	item_add.IsOptional = false;

	var item_entitystring = item_add.Add("entity: string", CommandStructureType.Any);
	item_entitystring.Description = "entity: string";
	item_entitystring.IsOptional = false;

	var item_objective = item_entitystring.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_count = item_objective.Add("count", CommandStructureType.Any);
	item_count.Description = "count";
	item_count.IsOptional = false;

	}

	//Branch: item_players.remove
	{
	var item_remove = item_players.Add("remove", CommandStructureType.Any);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;

	var item_entitystring = item_remove.Add("entity: string", CommandStructureType.Any);
	item_entitystring.Description = "entity: string";
	item_entitystring.IsOptional = false;

	var item_objective = item_entitystring.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_count = item_objective.Add("count", CommandStructureType.Any);
	item_count.Description = "count";
	item_count.IsOptional = false;

	}

	//Branch: item_players.reset
	{
	var item_reset = item_players.Add("reset", CommandStructureType.Any);
	item_reset.Description = "reset";
	item_reset.IsOptional = false;

	var item_entitystring = item_reset.Add("entity: string", CommandStructureType.Any);
	item_entitystring.Description = "entity: string";
	item_entitystring.IsOptional = false;

	var item_objective = item_entitystring.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_players.operation
	{
	var item_operation = item_players.Add("operation", CommandStructureType.Any);
	item_operation.Description = "operation";
	item_operation.IsOptional = false;

	var item_targetName = item_operation.Add("targetName", CommandStructureType.Any);
	item_targetName.Description = "targetName";
	item_targetName.IsOptional = false;

	var item_targetObjective = item_targetName.Add("targetObjective", CommandStructureType.Any);
	item_targetObjective.Description = "targetObjective";
	item_targetObjective.IsOptional = false;

	//Branch: item_targetObjective.<operation>
	{
	var item_operation = item_targetObjective.Add("operation", CommandStructureType.Any);
	item_operation.Description = "operation";
	item_operation.IsOptional = false;

	var item_selector = item_operation.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.%=
	{
	var item_%= = item_targetObjective.Add("%=", CommandStructureType.Any);
	item_%=.Description = "%=";
	item_%=.IsOptional = false;

	var item_selector = item_%=.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.*=
	{
	var item_*= = item_targetObjective.Add("*=", CommandStructureType.Any);
	item_*=.Description = "*=";
	item_*=.IsOptional = false;

	var item_selector = item_*=.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.+=
	{
	var item_+= = item_targetObjective.Add("+=", CommandStructureType.Any);
	item_+=.Description = "+=";
	item_+=.IsOptional = false;

	var item_selector = item_+=.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.-=
	{
	var item_-= = item_targetObjective.Add("-=", CommandStructureType.Any);
	item_-=.Description = "-=";
	item_-=.IsOptional = false;

	var item_selector = item_-=.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective./=
	{
	var item_/= = item_targetObjective.Add("/=", CommandStructureType.Any);
	item_/=.Description = "/=";
	item_/=.IsOptional = false;

	var item_selector = item_/=.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.< <selector> <objective>
	{
	var item_<selector><objective = item_targetObjective.Add("<selector> <objective", CommandStructureType.Any);
	item_<selector><objective.Description = "<selector> <objective";
	item_<selector><objective.IsOptional = false;

	}

	//Branch: item_targetObjective.=
	{
	var item_= = item_targetObjective.Add("=", CommandStructureType.Any);
	item_=.Description = "=";
	item_=.IsOptional = false;

	var item_selector = item_=.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.> <selector> <objective>
	{
	var item_<selector><objective = item_targetObjective.Add("<selector> <objective", CommandStructureType.Any);
	item_<selector><objective.Description = "<selector> <objective";
	item_<selector><objective.IsOptional = false;

	}

	//Branch: item_targetObjective.swap
	{
	var item_swap = item_targetObjective.Add("swap", CommandStructureType.Any);
	item_swap.Description = "swap";
	item_swap.IsOptional = false;

	var item_selector = item_swap.Add("selector", CommandStructureType.Any);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	}

	//Branch: item_players.test
	{
	var item_test = item_players.Add("test", CommandStructureType.Any);
	item_test.Description = "test";
	item_test.IsOptional = false;

	var item_entity = item_test.Add("entity", CommandStructureType.Any);
	item_entity.Description = "entity";
	item_entity.IsOptional = false;

	var item_objective = item_entity.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_min|* = item_objective.Add("min|*", CommandStructureType.Any);
	item_min|*.Description = "min|*";
	item_min|*.IsOptional = false;

	var item_max|* = item_min|*.Add("max|*", CommandStructureType.Any);
	item_max|*.Description = "max|*";
	item_max|*.IsOptional = false;

	}

	//Branch: item_players.random
	{
	var item_random = item_players.Add("random", CommandStructureType.Any);
	item_random.Description = "random";
	item_random.IsOptional = false;

	var item_entity = item_random.Add("entity", CommandStructureType.Any);
	item_entity.Description = "entity";
	item_entity.IsOptional = false;

	var item_objective = item_entity.Add("objective", CommandStructureType.Any);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_min = item_objective.Add("min", CommandStructureType.Any);
	item_min.Description = "min";
	item_min.IsOptional = false;

	var item_max = item_min.Add("max", CommandStructureType.Any);
	item_max.Description = "max";
	item_max.IsOptional = false;

	}

	}

	return Tree;
}
