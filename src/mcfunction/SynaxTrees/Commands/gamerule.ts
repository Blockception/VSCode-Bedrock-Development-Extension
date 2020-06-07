import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of gamerule
export const gameruleTree = creategamerule();

function creategamerule(): CommandStructureTree {
	var Tree = new CommandStructureTree("gamerule");
	Tree.Description = "Enabled or disables certain aspects of the game.";
	Tree.CanEnd = true;

	var item_valueBoolean = new CommandStructureItem("value", CommandStructureType.Boolean);
	item_valueBoolean.Description = "True or false to enabled or disable the command block";
	item_valueBoolean.IsOptional = true;

	var item_valueInt = new CommandStructureItem("value", CommandStructureType.Integer);
	item_valueInt.Description = "An integer value to assign";
	item_valueInt.IsOptional = true;

	//Gamerule.commandBlocksEnabled
	var item_commandBlocksEnabled = Tree.Add("commandBlocksEnabled", CommandStructureType.SameAsName);
	item_commandBlocksEnabled.Description = "Whether command blocks should be enabled in-game.";
	item_commandBlocksEnabled.Childs.push(item_valueBoolean);
	item_commandBlocksEnabled.IsOptional = false;

	//Gamerule.commandBlockOutput
	var item_commandBlockOutput = Tree.Add("commandBlockOutput", CommandStructureType.SameAsName);
	item_commandBlockOutput.Description = "Whether command blocks should notify admins when they perform commands.";
	item_commandBlockOutput.Childs.push(item_valueBoolean);
	item_commandBlockOutput.IsOptional = false;

	//Gamerule.doDaylightCycle
	var item_doDaylightCycle = Tree.Add("doDaylightCycle", CommandStructureType.SameAsName);
	item_doDaylightCycle.Description = "Whether the day-night cycle and moon phases progress.";
	item_doDaylightCycle.Childs.push(item_valueBoolean);
	item_doDaylightCycle.IsOptional = false;

	//Gamerule.doEntityDrops
	var item_doEntityDrops = Tree.Add("doEntityDrops", CommandStructureType.SameAsName);
	item_doEntityDrops.Description = "Whether entities that are not mobs should have drops.";
	item_doEntityDrops.Childs.push(item_valueBoolean);
	item_doEntityDrops.IsOptional = false;

	//Gamerule.doFireTick
	var item_doFireTick = Tree.Add("doFireTick", CommandStructureType.SameAsName);
	item_doFireTick.Description = "Whether fire should spread and naturally extinguish.";
	item_doFireTick.Childs.push(item_valueBoolean);
	item_doFireTick.IsOptional = false;

	//Gamerule.doInsomnia
	var item_doInsomnia = Tree.Add("doInsomnia", CommandStructureType.SameAsName);
	item_doInsomnia.Description = "Whether phantoms can spawn in the nighttime.";
	item_doInsomnia.Childs.push(item_valueBoolean);
	item_doInsomnia.IsOptional = false;

	//Gamerule.immediateRespawn
	var item_immediateRespawn = Tree.Add("immediateRespawn", CommandStructureType.SameAsName);
	item_immediateRespawn.Description = "Players respawn immediately without showing the death screen.";
	item_immediateRespawn.Childs.push(item_valueBoolean);
	item_immediateRespawn.IsOptional = false;

	//Gamerule.doMobLoot
	var item_doMobLoot = Tree.Add("doMobLoot", CommandStructureType.SameAsName);
	item_doMobLoot.Description = "Whether mobs should drop items.";
	item_doMobLoot.Childs.push(item_valueBoolean);
	item_doMobLoot.IsOptional = false;

	//Gamerule.doMobSpawning
	var item_doMobSpawning = Tree.Add("doMobSpawning", CommandStructureType.SameAsName);
	item_doMobSpawning.Description = "Whether mobs should naturally spawn. Does not affect monster spawners.";
	item_doMobSpawning.Childs.push(item_valueBoolean);
	item_doMobSpawning.IsOptional = false;

	//Gamerule.doTileDrops
	var item_doTileDrops = Tree.Add("doTileDrops", CommandStructureType.SameAsName);
	item_doTileDrops.Description = "Whether blocks should have drops.";
	item_doTileDrops.Childs.push(item_valueBoolean);
	item_doTileDrops.IsOptional = false;

	//Gamerule.doWeatherCycle
	var item_doWeatherCycle = Tree.Add("doWeatherCycle", CommandStructureType.SameAsName);
	item_doWeatherCycle.Description = "Whether the weather can change naturally. The /weather command can still change weather.";
	item_doWeatherCycle.Childs.push(item_valueBoolean);
	item_doWeatherCycle.IsOptional = false;

	//Gamerule.drowningDamage
	var item_drowningDamage = Tree.Add("drowningDamage", CommandStructureType.SameAsName);
	item_drowningDamage.Description = "Whether the player should take damage when drowning.";
	item_drowningDamage.Childs.push(item_valueBoolean);
	item_drowningDamage.IsOptional = false;

	//Gamerule.fallDamage
	var item_fallDamage = Tree.Add("fallDamage", CommandStructureType.SameAsName);
	item_fallDamage.Description = "Whether the player should take fall damage.";
	item_fallDamage.Childs.push(item_valueBoolean);
	item_fallDamage.IsOptional = false;

	//Gamerule.fireDamage
	var item_fireDamage = Tree.Add("fireDamage", CommandStructureType.SameAsName);
	item_fireDamage.Description = "Whether the player should take fire damage.";
	item_fireDamage.Childs.push(item_valueBoolean);
	item_fireDamage.IsOptional = false;

	//Gamerule.keepInventory
	var item_keepInventory = Tree.Add("keepInventory", CommandStructureType.SameAsName);
	item_keepInventory.Description = "Whether the player should keep items and experience in their inventory after death.";
	item_keepInventory.Childs.push(item_valueBoolean);
	item_keepInventory.IsOptional = false;

	//Gamerule.maxCommandChainLength
	var item_maxCommandChainLength = Tree.Add("maxCommandChainLength", CommandStructureType.SameAsName);
	item_maxCommandChainLength.Description = "Determines the number at which the chain command block acts as a \"chain\".";
	item_maxCommandChainLength.Childs.push(item_valueInt);
	item_maxCommandChainLength.IsOptional = false;

	//Gamerule.mobGriefing
	var item_mobGriefing = Tree.Add("mobGriefing", CommandStructureType.SameAsName);
	item_mobGriefing.Description = "Whether creepers, zombies, endermen, ghasts, withers, ender dragons, rabbits, sheep, villagers, silverfish, and snow golems should be able to change blocks and whether mobs can pick up items. This also affects the capability of zombie-like creatures like zombie pigmen and drowned to pathfind to turtle eggs. This will also prevent villagers from breeding.";
	item_mobGriefing.Childs.push(item_valueBoolean);
	item_mobGriefing.IsOptional = false;

	//Gamerule.naturalRegeneration
	var item_naturalRegeneration = Tree.Add("naturalRegeneration", CommandStructureType.SameAsName);
	item_naturalRegeneration.Description = "Whether the player can regenerate health naturally if their hunger is full enough (doesn't affect external healing, such as golden apples, the Regeneration effect, etc.).";
	item_naturalRegeneration.Childs.push(item_valueBoolean);
	item_naturalRegeneration.IsOptional = false;

	//Gamerule.pvp
	var item_pvp = Tree.Add("pvp", CommandStructureType.SameAsName);
	item_pvp.Description = "Whether the player can fight with other players.";
	item_pvp.Childs.push(item_valueBoolean);
	item_pvp.IsOptional = false;

	//Gamerule.randomTickSpeed
	var item_randomTickSpeed = Tree.Add("randomTickSpeed", CommandStructureType.SameAsName);
	item_randomTickSpeed.Description = "How often a random block tick occurs (such as plant growth, leaf decay, etc.) per chunk section per game tick. 0 disables random ticks [needs testing], higher numbers increase random ticks. Setting to a high integer results in high speeds of decay and growth.";
	item_randomTickSpeed.Childs.push(item_valueBoolean);
	item_randomTickSpeed.IsOptional = false;

	//Gamerule.sendCommandFeedback
	var item_sendCommandFeedback = Tree.Add("sendCommandFeedback", CommandStructureType.SameAsName);
	item_sendCommandFeedback.Description = "Whether the feedback from commands executed by a player should show up in chat. Also affects the default behavior of whether command blocks store their output text.";
	item_sendCommandFeedback.Childs.push(item_valueBoolean);
	item_sendCommandFeedback.IsOptional = false;

	//Gamerule.showCoordinates
	var item_showCoordinates = Tree.Add("showCoordinates", CommandStructureType.SameAsName);
	item_showCoordinates.Description = "Whether the player's coordinates are displayed.";
	item_showCoordinates.Childs.push(item_valueBoolean);
	item_showCoordinates.IsOptional = false;

	//Gamerule.showDeathMessages
	var item_showDeathMessages = Tree.Add("showDeathMessages", CommandStructureType.SameAsName);
	item_showDeathMessages.Description = "Whether death messages are put into chat when a player dies. Also affects whether a message is sent to the pet's owner when the pet dies.";
	item_showDeathMessages.Childs.push(item_valueBoolean);
	item_showDeathMessages.IsOptional = false;

	//Gamerule.spawnRadius
	var item_spawnRadius = Tree.Add("spawnRadius", CommandStructureType.SameAsName);
	item_spawnRadius.Description = "The number of blocks outward from the world spawn coordinates that a player spawns in when first joining a server or when dying without a personal spawnpoint/.";
	item_spawnRadius.Childs.push(item_valueBoolean);
	item_spawnRadius.IsOptional = false;

	//Gamerule.tntExplodes
	var item_tntExplodes = Tree.Add("tntExplodes", CommandStructureType.SameAsName);
	item_tntExplodes.Description = "Whether TNT explodes after activation.";
	item_tntExplodes.Childs.push(item_valueBoolean);
	item_tntExplodes.IsOptional = false;

	//Gamerule.showTags
	var item_showTags = Tree.Add("showTags", CommandStructureType.SameAsName);
	item_showTags.Description = "Hides the \"Can place on\" and \"Can destroy\" block lists from item lore.";
	item_showTags.Childs.push(item_valueBoolean);
	item_showTags.IsOptional = false;

	return Tree;
}
