import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of scoreboard
export const scoreboardTree = createscoreboard();

function createscoreboard() : CommandStructureTree {
	var Tree = new CommandStructureTree("scoreboard");
	Tree.Description = "Lists all created variables in the scoreboard";
	Tree.CanEnd = true;

	//Branch: scoreboard.objectives
	{
	var item_objectives = Tree.Add("objectives", CommandStructureType.SameAsName);
	item_objectives.Description = "objectives";
	item_objectives.IsOptional = false;

	//Branch: item_objectives.list
	{
	var item_list = item_objectives.Add("list", CommandStructureType.SameAsName);
	item_list.Description = "list";
	item_list.IsOptional = false;

	}

	//Branch: item_objectives.add
	{
	var item_add = item_objectives.Add("add", CommandStructureType.SameAsName);
	item_add.Description = "add";
	item_add.IsOptional = false;

	var item_name = item_add.Add("name", CommandStructureType.Objective);
	item_name.Description = "name";
	item_name.IsOptional = false;

	var item_dummy = item_name.Add("dummy", CommandStructureType.SameAsName);
	item_dummy.Description = "dummy";
	item_dummy.IsOptional = false;

	var item_displaynamestring = item_dummy.Add("display name", CommandStructureType.String);
	item_displaynamestring.Description = "display name: string";
	item_displaynamestring.IsOptional = true;

	}

	//Branch: item_objectives.remove
	{
	var item_remove = item_objectives.Add("remove", CommandStructureType.SameAsName);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;

	var item_name = item_remove.Add("name", CommandStructureType.SameAsName);
	item_name.Description = "name";
	item_name.IsOptional = false;

	}

	//Branch: item_objectives.setdisplay
	{
	var item_setdisplay = item_objectives.Add("setdisplay", CommandStructureType.SameAsName);
	item_setdisplay.Description = "setdisplay";
	item_setdisplay.IsOptional = false;

	//Branch: item_setdisplay.belowname
	{
	var item_belowname = item_setdisplay.Add("belowname", CommandStructureType.SameAsName);
	item_belowname.Description = "belowname";
	item_belowname.IsOptional = false;

	var item_objective = item_belowname.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_setdisplay.list
	{
	var item_list = item_setdisplay.Add("list", CommandStructureType.SameAsName);
	item_list.Description = "list";
	item_list.IsOptional = false;

	var item_objective = item_list.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	//Branch: item_setdisplay.sidebar
	{
	var item_sidebar = item_setdisplay.Add("sidebar", CommandStructureType.SameAsName);
	item_sidebar.Description = "sidebar";
	item_sidebar.IsOptional = false;

	var item_objective = item_sidebar.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;

	}

	}

	}

	//Branch: scoreboard.players
	{
	var item_players = Tree.Add("players", CommandStructureType.SameAsName);
	item_players.Description = "players";
	item_players.IsOptional = false;

	//Branch: item_players.list
	{
	var item_list = item_players.Add("list", CommandStructureType.SameAsName);
	item_list.Description = "list";
	item_list.IsOptional = false;

	var item_entity = item_list.Add("target", CommandStructureType.Target);
	item_entity.Description = "The entity target/selector";
	item_entity.IsOptional = true;
	}

	//Branch: item_players.set
	{
	var item_set = item_players.Add("set", CommandStructureType.SameAsName);
	item_set.Description = "set";
	item_set.IsOptional = false;

	var item_entitystring = item_set.Add("target", CommandStructureType.Target);
	item_entitystring.Description = "The entity target/selector"
	item_entitystring.IsOptional = false;

	var item_objective = item_entitystring.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_score = item_objective.Add("score", CommandStructureType.Integer);
	item_score.Description = "The value"
	item_score.IsOptional = false;

	}

	//Branch: item_players.add
	{
	var item_add = item_players.Add("add", CommandStructureType.SameAsName);
	item_add.Description = "add";
	item_add.IsOptional = false;

	var item_entitystring = item_add.Add("target", CommandStructureType.Target);
	item_entitystring.Description = "The entity target/selector"
	item_entitystring.IsOptional = false;

	var item_objective = item_entitystring.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_count = item_objective.Add("count", CommandStructureType.Integer);
	item_count.Description = "count";
	item_count.IsOptional = false;

	}

	//Branch: item_players.remove
	{
	var item_remove = item_players.Add("remove", CommandStructureType.SameAsName);
	item_remove.Description = "remove";
	item_remove.IsOptional = false;

	var item_entitystring = item_remove.Add("target", CommandStructureType.Target);
	item_entitystring.Description = "The entity target/selector"
	item_entitystring.IsOptional = false;

	var item_objective = item_entitystring.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_count = item_objective.Add("count", CommandStructureType.Integer);
	item_count.Description = "count";
	item_count.IsOptional = false;

	}

	//Branch: item_players.reset
	{
	var item_reset = item_players.Add("reset", CommandStructureType.SameAsName);
	item_reset.Description = "reset";
	item_reset.IsOptional = false;

	var item_entitystring = item_reset.Add("target", CommandStructureType.Target);
	item_entitystring.Description = "The entity target/selector"
	item_entitystring.IsOptional = false;

	var item_objective = item_entitystring.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = true;
	}

	//Branch: item_players.operation
	{
	var item_operation = item_players.Add("operation", CommandStructureType.SameAsName);
	item_operation.Description = "operation";
	item_operation.IsOptional = false;

	var item_targetName = item_operation.Add("targetName", CommandStructureType.Target);
	item_targetName.Description = "targetName";
	item_targetName.IsOptional = false;

	var item_targetObjective = item_targetName.Add("targetObjective", CommandStructureType.Objective);
	item_targetObjective.Description = "targetObjective";
	item_targetObjective.IsOptional = false;

	//Branch: item_targetObjective.<operation>
	{
	var item_operation = item_targetObjective.Add("operation", CommandStructureType.SameAsName);
	item_operation.Description = "operation";
	item_operation.IsOptional = false;

	var item_selector = item_operation.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;
	}

	//Branch: item_targetObjective.%=
	{
	var item_ModulusOp = item_targetObjective.Add("%=", CommandStructureType.SameAsName);
	item_ModulusOp.Description = "%=";
	item_ModulusOp.IsOptional = false;

	var item_selector = item_ModulusOp.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;
	}

	//Branch: item_targetObjective.*=
	{
	var item_MultiplyOp = item_targetObjective.Add("*=", CommandStructureType.SameAsName);
	item_MultiplyOp.Description = "*=";
	item_MultiplyOp.IsOptional = false;

	var item_selector = item_MultiplyOp.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.+=
	{
	var item_SumOp = item_targetObjective.Add("+=", CommandStructureType.SameAsName);
	item_SumOp.Description = "+=";
	item_SumOp.IsOptional = false;

	var item_selector = item_SumOp.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.-=
	{
	var item_SubstractOp = item_targetObjective.Add("-=", CommandStructureType.SameAsName);
	item_SubstractOp.Description = "-=";
	item_SubstractOp.IsOptional = false;

	var item_selector = item_SubstractOp.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective./=
	{
	var item_DivisionOp = item_targetObjective.Add("/=", CommandStructureType.SameAsName);
	item_DivisionOp.Description = "/=";
	item_DivisionOp.IsOptional = false;

	var item_selector = item_DivisionOp.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.< <selector> <objective>
	{
	var item_LesserThenOp = item_targetObjective.Add(">", CommandStructureType.SameAsName);
	item_LesserThenOp.Description = "<selector> <objective";
	item_LesserThenOp.IsOptional = false;

	var item_selector = item_LesserThenOp.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.=
	{
	var item_AssignOp = item_targetObjective.Add("=", CommandStructureType.SameAsName);
	item_AssignOp.Description = "=";
	item_AssignOp.IsOptional = false;

	var item_selector = item_AssignOp.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	//Branch: item_targetObjective.> <selector> <objective>
	{
	var item_GreaterthanOp = item_targetObjective.Add("<", CommandStructureType.SameAsName);
	item_GreaterthanOp.Description = "<selector> <objective";
	item_GreaterthanOp.IsOptional = false;

	var item_selector = item_GreaterthanOp.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;
	}

	//Branch: item_targetObjective.swap
	{
	var item_swap = item_targetObjective.Add("swap", CommandStructureType.SameAsName);
	item_swap.Description = "swap";
	item_swap.IsOptional = false;

	var item_selector = item_swap.Add("selector", CommandStructureType.Target);
	item_selector.Description = "selector";
	item_selector.IsOptional = false;

	var item_objective = item_selector.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	}

	}

	//Branch: item_players.test
	{
	var item_test = item_players.Add("test", CommandStructureType.SameAsName);
	item_test.Description = "test";
	item_test.IsOptional = false;

	var item_entity = item_test.Add("entity", CommandStructureType.SameAsName);
	item_entity.Description = "The entity target/selector";
	item_entity.IsOptional = false;

	var item_objective = item_entity.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_min = item_objective.Add("min|*", CommandStructureType.Any);
	item_min.Description = "min|*";
	item_min.IsOptional = false;
	item_min.MustMatch = "^[\*\d\-]+$"

	var item_max = item_min.Add("max|*", CommandStructureType.Any);
	item_max.Description = "max|*";
	item_max.IsOptional = false;
	item_max.MustMatch = "^[\*\d\-]+$";
	}

	//Branch: item_players.random
	{
	var item_random = item_players.Add("random", CommandStructureType.SameAsName);
	item_random.Description = "random";
	item_random.IsOptional = false;

	var item_entity = item_random.Add("entity", CommandStructureType.Target);
	item_entity.Description = "The entity target/selector";
	item_entity.IsOptional = false;

	var item_objective = item_entity.Add("objective", CommandStructureType.Objective);
	item_objective.Description = "objective";
	item_objective.IsOptional = false;

	var item_min = item_objective.Add("min", CommandStructureType.Integer);
	item_min.Description = "min";
	item_min.IsOptional = false;

	var item_max = item_min.Add("max", CommandStructureType.Integer);
	item_max.Description = "max";
	item_max.IsOptional = false;

	}

	}

	return Tree;
}
