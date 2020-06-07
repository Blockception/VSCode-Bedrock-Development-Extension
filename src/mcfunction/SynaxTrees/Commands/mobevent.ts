import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of mobevent
export const mobeventTree = createmobevent();

function createmobevent() : CommandStructureTree {
	var Tree = new CommandStructureTree("mobevent");
	Tree.Description = "Controls what mob events are allowed to run.";
	Tree.CanEnd = true;

	var item_valueBoolean = new CommandStructureItem("value", CommandStructureType.Boolean);
	item_valueBoolean.Description = "value: Boolean";
	item_valueBoolean.IsOptional = true;

	//Branch: mobevent.minecraft:pillager_patrols_event
	{
		var item_minecraftpillager_patrols_event = Tree.Add("minecraft:pillager_patrols_event", CommandStructureType.Any);
		item_minecraftpillager_patrols_event.Description = "minecraft:pillager_patrols_event";
		item_minecraftpillager_patrols_event.IsOptional = false;
		item_minecraftpillager_patrols_event.Childs.push(item_valueBoolean);
	}

	//Branch: mobevent.wandering_trader_event
	{
		var item_wandering_trader_event = Tree.Add("wandering_trader_event", CommandStructureType.Any);
		item_wandering_trader_event.Description = "wandering_trader_event";
		item_wandering_trader_event.IsOptional = false;
		item_wandering_trader_event.Childs.push(item_valueBoolean);
	}

	//Branch: mobevent.events_enabled
	{
		var item_events_enabled = Tree.Add("events_enabled", CommandStructureType.Any);
		item_events_enabled.Description = "events_enabled";
		item_events_enabled.IsOptional = false;
		item_events_enabled.Childs.push(item_valueBoolean);
	}

	return Tree;
}
