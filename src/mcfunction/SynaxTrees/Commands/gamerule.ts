import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of gamerule
export const gameruleTree = creategamerule();

function creategamerule() : CommandStructureTree {
	var Tree = new CommandStructureTree("gamerule");
	Tree.Description = "Whether command blocks should be enabled in-game.";
	Tree.CanEnd = true;

	//Branch: gamerule.commandBlocksEnabled
	{
	var item_commandBlocksEnabled = Tree.Add("commandBlocksEnabled", CommandStructureType.Any);
	item_commandBlocksEnabled.Description = "commandBlocksEnabled";
	item_commandBlocksEnabled.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.commandBlockOutput
	{
	var item_commandBlockOutput = Tree.Add("commandBlockOutput", CommandStructureType.Any);
	item_commandBlockOutput.Description = "commandBlockOutput";
	item_commandBlockOutput.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.doDaylightCycle
	{
	var item_doDaylightCycle = Tree.Add("doDaylightCycle", CommandStructureType.Any);
	item_doDaylightCycle.Description = "doDaylightCycle";
	item_doDaylightCycle.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.doEntityDrops
	{
	var item_doEntityDrops = Tree.Add("doEntityDrops", CommandStructureType.Any);
	item_doEntityDrops.Description = "doEntityDrops";
	item_doEntityDrops.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.doFireTick
	{
	var item_doFireTick = Tree.Add("doFireTick", CommandStructureType.Any);
	item_doFireTick.Description = "doFireTick";
	item_doFireTick.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.doInsomnia
	{
	var item_doInsomnia = Tree.Add("doInsomnia", CommandStructureType.Any);
	item_doInsomnia.Description = "doInsomnia";
	item_doInsomnia.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.immediateRespawn
	{
	var item_immediateRespawn = Tree.Add("immediateRespawn", CommandStructureType.Any);
	item_immediateRespawn.Description = "immediateRespawn";
	item_immediateRespawn.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.doMobLoot
	{
	var item_doMobLoot = Tree.Add("doMobLoot", CommandStructureType.Any);
	item_doMobLoot.Description = "doMobLoot";
	item_doMobLoot.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.doMobSpawning
	{
	var item_doMobSpawning = Tree.Add("doMobSpawning", CommandStructureType.Any);
	item_doMobSpawning.Description = "doMobSpawning";
	item_doMobSpawning.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.doTileDrops
	{
	var item_doTileDrops = Tree.Add("doTileDrops", CommandStructureType.Any);
	item_doTileDrops.Description = "doTileDrops";
	item_doTileDrops.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.doWeatherCycle
	{
	var item_doWeatherCycle = Tree.Add("doWeatherCycle", CommandStructureType.Any);
	item_doWeatherCycle.Description = "doWeatherCycle";
	item_doWeatherCycle.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.drowningDamage
	{
	var item_drowningDamage = Tree.Add("drowningDamage", CommandStructureType.Any);
	item_drowningDamage.Description = "drowningDamage";
	item_drowningDamage.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.fallDamage
	{
	var item_fallDamage = Tree.Add("fallDamage", CommandStructureType.Any);
	item_fallDamage.Description = "fallDamage";
	item_fallDamage.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.fireDamage
	{
	var item_fireDamage = Tree.Add("fireDamage", CommandStructureType.Any);
	item_fireDamage.Description = "fireDamage";
	item_fireDamage.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.keepInventory
	{
	var item_keepInventory = Tree.Add("keepInventory", CommandStructureType.Any);
	item_keepInventory.Description = "keepInventory";
	item_keepInventory.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.maxCommandChainLength
	{
	var item_maxCommandChainLength = Tree.Add("maxCommandChainLength", CommandStructureType.Any);
	item_maxCommandChainLength.Description = "maxCommandChainLength";
	item_maxCommandChainLength.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.gamerule
	{
	var item_gamerule = Tree.Add("gamerule", CommandStructureType.Any);
	item_gamerule.Description = "gamerule";
	item_gamerule.IsOptional = false;

	var item_mobGriefing = Tree.Add("mobGriefing", CommandStructureType.Any);
	item_mobGriefing.Description = "mobGriefing";
	item_mobGriefing.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.naturalRegeneration
	{
	var item_naturalRegeneration = Tree.Add("naturalRegeneration", CommandStructureType.Any);
	item_naturalRegeneration.Description = "naturalRegeneration";
	item_naturalRegeneration.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.pvp
	{
	var item_pvp = Tree.Add("pvp", CommandStructureType.Any);
	item_pvp.Description = "pvp";
	item_pvp.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.randomTickSpeed
	{
	var item_randomTickSpeed = Tree.Add("randomTickSpeed", CommandStructureType.Any);
	item_randomTickSpeed.Description = "randomTickSpeed";
	item_randomTickSpeed.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.sendCommandFeedback
	{
	var item_sendCommandFeedback = Tree.Add("sendCommandFeedback", CommandStructureType.Any);
	item_sendCommandFeedback.Description = "sendCommandFeedback";
	item_sendCommandFeedback.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.showCoordinates
	{
	var item_showCoordinates = Tree.Add("showCoordinates", CommandStructureType.Any);
	item_showCoordinates.Description = "showCoordinates";
	item_showCoordinates.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.showDeathMessages
	{
	var item_showDeathMessages = Tree.Add("showDeathMessages", CommandStructureType.Any);
	item_showDeathMessages.Description = "showDeathMessages";
	item_showDeathMessages.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.spawnRadius
	{
	var item_spawnRadius = Tree.Add("spawnRadius", CommandStructureType.Any);
	item_spawnRadius.Description = "spawnRadius";
	item_spawnRadius.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.tntExplodes
	{
	var item_tntExplodes = Tree.Add("tntExplodes", CommandStructureType.Any);
	item_tntExplodes.Description = "tntExplodes";
	item_tntExplodes.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	//Branch: gamerule.showTags
	{
	var item_showTags = Tree.Add("showTags", CommandStructureType.Any);
	item_showTags.Description = "showTags";
	item_showTags.IsOptional = false;

	var item_value = Tree.Add("value", CommandStructureType.Any);
	item_value.Description = "value";
	item_value.IsOptional = true;

	}

	return Tree;
}
