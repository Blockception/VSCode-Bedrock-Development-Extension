# Behavior filters

- [Behavior filters](#behavior-filters)
	- [Structure](#structure)
	- [Test Types](#test-types)
	- [Subject](#subject)
	- [Operator](#operator)

## Structure

```json
{
	//If any is true
	"any_of": [ { /*Recursive filter structure*/} ],
	"all_of": [ { /*Recursive filter structure*/} ],
	"none_of": [ { /*Recursive filter structure*/} ],

	//else:
	"test": "...", //The test
	"subject": "...", //The entity that is subject to this test
	"operator": "...", //The type of comparison,

	//Either:
	"value": 1, //As a number
	"value": "player" //As a string
}
```

---
## Test Types

|Test type |Description |
|---|---|
|`clock_time` |Compares the current time with a float value in the range (0.0, 1.0). 0.0= Noon 0.25= Sunset 0.5= Midnight 0.75= Sunrise |
|`distance_to_nearest_player` |Compares the distance to the nearest Player with a float value.|
|`has_ability` |Returns true when the subject entity has the named ability.|
|`has_biome_tag` |Tests whether the biome the subject is in has the specified tag.|
|`has_component` |Returns true when the subject entity contains the named component.|
|`has_container_open` |Returns true when the subject Player entity has opened a container.|
|`has_damage` ||
|`has_equipment` ||
|`has_mob_effect` ||
|`has_ranged_weapon` ||
|`has_tag` ||
|`has_target` ||
|`has_trade_supply` ||
|`hourly_clock_time` ||
|`in_caravan` ||
|`in_clouds` ||
|`in_lava` ||
|`in_nether` ||
|`in_water` ||
|`in_water_or_rain` ||
|`inactivity_timer` ||
|`is_altitude` ||
|`is_avoiding_mobs` ||
|`is_biome` ||
|`is_block` ||
|`is_brightness` ||
|`is_climbing` ||
|`is_color` ||
|`is_daytime` ||
|`is_difficulty` ||
|`is_family` ||
|`is_game_rule` ||
|`is_humid` ||
|`is_immobile` ||
|`is_in_village` ||
|`is_leashed` ||
|`is_leashed_to` ||
|`is_mark_variant` ||
|`is_moving` ||
|`is_owner` ||
|`is_persistent` ||
|`is_riding` ||
|`is_skin_id` ||
|`is_sleeping` ||
|`is_sneaking` ||
|`is_snow_covered` ||
|`is_target` ||
|`is_temperature_type` ||
|`is_temperature_value` ||
|`is_underground` ||
|`is_underwater` ||
|`is_variant` ||
|`is_visible` ||
|`is_weather` ||
|`light_level` ||
|`moon_intensity` ||
|`moon_phase` ||
|`on_ground` ||
|`on_ladder` ||
|`random_chance` ||
|`rider_count` ||
|`surface_mob` ||
|`trusts` ||
|`weather` ||
|`weather_at_position` ||

---
## Subject
|Subject	|Description	|
|---|---|
|`block`|	The block involved with the interaction. |
|`damager`|	The damaging actor involved with the interaction. |
|`other`|	The other member of an interaction, not the caller. |
|`parent`|	The caller's current parent. |
|`player`|	The player involved with the interaction. |
|`self`|	The entity or object calling the test |
|`target`|	The caller's current target. |

---
## Operator
|Operator |Description |
|---|---|
|`!=`|	Test for inequality. |
|`<`|	Test for less-than the value. |
|`<=`|	Test for less-than or equal to the value. |
|`<>`|	Test for inequality. |
|`=`|	Test for equality. |
|`==`|	Test for equality. |
|`>`|	Test for greater-than the value. |
|`>=`|	Test for greater-than or equal to the value. |
|`equals`|	Test for equality. |
|`not`|	Test for inequality. |